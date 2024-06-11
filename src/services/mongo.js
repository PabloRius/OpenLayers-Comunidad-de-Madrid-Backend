import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri =
  process.env.ENV === "local"
    ? "mongodb://localhost:27017"
    : "mongodb://mongo:BevCbfgHIQXLGXHCTFjuGdmzaiBYvxQy@monorail.proxy.rlwy.net:31235";
const client = new MongoClient(uri);
let conn;
try {
  console.debug(`Connecting to uri: ${uri}`);
  conn = await client.connect();
} catch (e) {
  console.error("Error connecting to the database: ", e);
}
let db = conn?.db("data") || null;

export default db;
