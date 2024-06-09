import express from "express";
import cors from "cors";
import { base_router } from "./routes/main";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", base_router);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
