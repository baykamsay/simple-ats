const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; // put your jwt secret in env.local

// const saltRounds = 10;
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

function authUser(db, username, password, hash, callback) {
  //   const collection = db.collection("user");
  bcrypt.compare(password, hash, callback);
}

export default (req, res) => {
  if (req.method === "POST") {
    //login
    try {
      assert.notEqual(null, req.body.username, "Email required");
      assert.notEqual(null, req.body.password, "Password required");
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

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
          res.status(404).json({ error: true, message: "User not found" });
          return;
        } else {
          authUser(db, username, password, user.password, function (
            err,
            match
          ) {
            if (err) {
              res.status(500).json({ error: true, message: "Auth Failed" });
            }
            if (match) {
              const token = jwt.sign(
                { userId: user.userId, username: user.username },
                jwtSecret
              );
              res.status(200).json({ token });
              return;
            } else {
              res.status(401).json({ error: true, message: "Auth Failed" });
              return;
            }
          });
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};
