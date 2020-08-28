import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection("jobs").find().toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  await req.db.collection("jobs").insertOne({
    title: data.title,
    location: data.location,
    description: data.description,
    applicants: [],
  });
  res.json({ message: "ok" });
});

handler.put(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  await req.db
    .collection("jobs")
    .updateOne(
      { _id: ObjectId(data.id) },
      {
        $set: {
          title: data.title,
          location: data.location,
          description: data.description,
        },
      },
      function (err) {
        if (err) throw err;
      }
    );
  res.json({ message: "ok" });
});

handler.delete(async (req, res) => {
  let id = req.body;
  id = JSON.parse(id);
  await req.db
    .collection("jobs")
    .deleteOne({ _id: ObjectId(id) }, function (err) {
      if (err) throw err;
    });
  res.json({ message: "ok" });
});

export default handler;
