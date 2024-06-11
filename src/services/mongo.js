import { MongoClient } from "mongodb";

const uri =
  "mongodb://mongo:BevCbfgHIQXLGXHCTFjuGdmzaiBYvxQy@monorail.proxy.rlwy.net:31235";
const client = new MongoClient(uri);
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn?.db("data") || null;

export default db;
