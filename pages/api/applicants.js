import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection("applicants").find().toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  const listing = data.listing;
  delete data.listing;
  data.stage = "Applied";
  data.notes = "";
  data.rating = 0;
  data.cv = ObjectId(data.cv[0].response.message);
  let doc = await req.db.collection("applicants").insertOne(data);
  await req.db
    .collection("jobs")
    .updateOne(
      { _id: ObjectId(listing) },
      { $push: { applicants: doc.insertedId } }
    );
  res.json({ message: "ok" });
});

handler.put(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  await req.db
    .collection("applicants")
    .updateOne(
      { _id: ObjectId(data.id) },
      { $set: { stage: data.stage, notes: data.notes, rating: data.rating } },
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
    .collection("applicants")
    .deleteOne({ _id: ObjectId(id) }, function (err) {
      if (err) throw err;
    });
  await req.db
    .collection("jobs")
    .updateMany({}, { $pull: { applicants: ObjectId(id) } });
  res.json({ message: "ok" });
});

export default handler;
