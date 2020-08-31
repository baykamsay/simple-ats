import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { Binary } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  // try multiparty
  let data = {};
  data.file = Binary(req.body);

  let doc = await req.db.collection("cvs").insertOne(data);

  res.json({ message: doc.insertedId });
});

export default handler;
