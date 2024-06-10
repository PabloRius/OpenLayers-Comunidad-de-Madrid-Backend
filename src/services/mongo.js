import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/data";
const client = new MongoClient(uri);
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn?.db("data") || null;

export default db;
