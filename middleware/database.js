import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("ATS");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
