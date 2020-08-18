const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcrypt");
const v4 = require("uuid").v4;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; // put your jwt secret in env.local

const saltRounds = 10;
const dbName = "ATS";
const client = new MongoClient(
  process.env.DB_URL, // put your db url in .env.local
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

function findUser(db, username, callback) {
  const collection = db.collection("user");
  collection.findOne({ username }, callback);
}

function createUser(db, username, password, callback) {
  const collection = db.collection("user");
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        username,
        password: hash,
      },
      function (err, userCreated) {
        assert.equal(err, null);
        callback(userCreated);
      }
    );
  });
}

export default (req, res) => {
  if (req.method === "POST") {
    // signup
    try {
      assert.notEqual(null, req.body.username, "Username required");
      assert.notEqual(null, req.body.password, "Password required");
    } catch (bodyError) {
      return res.status(403).json({ error: true, message: bodyError.message });
    }

    // verify username does not exist already
    client.connect(function (err) {
      assert.equal(null, err);
      console.log("Connected to MongoDB server =>");
      const db = client.db(dbName);
      const username = req.body.username;
      const password = req.body.password;

      findUser(db, username, function (err, user) {
        if (err) {
          res.status(500).json({ error: true, message: "Error finding User" });
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, username, password, function (creationResult) {
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0];
              const token = jwt.sign(
                { userId: user.userId, username: user.username },
                jwtSecret
                // , {
                //   expiresIn: 3000, //50 minutes
                // }
              );
              res.status(200).json({ token });
              return;
            }
          });
        } else {
          // User exists
          res.status(403).json({ error: true, message: "Username exists" });
          return;
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ users: ["John Doe"] });
  }
};
