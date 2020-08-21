import nextConnect from "next-connect";
import middleware from "../../middleware/database";

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
  let doc = await req.db.collection("applicants").insertOne(data);
  let doc2 = await req.db
    .collection("jobs")
    .updateOne({ title: listing }, { $push: { applicants: doc.insertedId } });
  res.json({ message: "ok" });
});

export default handler;
