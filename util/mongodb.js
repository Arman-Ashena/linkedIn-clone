// for connecting to Database
import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error(
    "Please define mongodb_uri environemnt variable inside env.local"
  );
}
if (!dbName) {
  throw new Error(
    "Please define mongodb_db environemnt variable inside env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}
