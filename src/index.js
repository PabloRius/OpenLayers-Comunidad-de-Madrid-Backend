import express from "express";
import cors from "cors";
import { api } from "./routes/api.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("Health OK");
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
