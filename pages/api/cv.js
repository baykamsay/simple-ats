import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { Binary } from "mongodb";
import formidable from "formidable";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const form = formidable({ multiples: true });

  await form.parse(req, (err, fields, files) => {
    console.log("fields:", fields);
    console.log("files:", files);
  });

  console.log(form);

  let data = {};
  data.file = Binary(req.body);

  let doc = await req.db.collection("cvs").insertOne(data);

  res.json({ message: doc.insertedId });
});

export default handler;
