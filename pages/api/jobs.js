import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection("jobs").find().toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  let doc = await req.db.collection("jobs").insertOne({
    title: data.title,
    description: data.description,
    applicants: [],
  });
  res.json({ message: "ok" });
});

export default handler;
