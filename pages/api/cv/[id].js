import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db
    .collection("cvs")
    .findOne({ _id: ObjectId(req.query.id) });
  doc.file = doc.file.buffer;
  res.json(doc);
});

export default handler;
