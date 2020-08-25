import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db
    .collection("jobs")
    .findOne({ _id: ObjectId(req.query.id) });
  const applicantIds = doc.applicants;
  const applicants = await Promise.all(
    applicantIds.map(
      async (applicantId) =>
        await req.db.collection("applicants").findOne({ _id: applicantId })
    )
  );
  res.json(applicants);
});

export default handler;
