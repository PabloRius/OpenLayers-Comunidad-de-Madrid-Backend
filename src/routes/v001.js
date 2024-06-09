import express from "express";
import { mongodata_endpoint } from "./mongodata";

const ver001 = express.Router();

ver001.get("/mongodata", mongodata_endpoint);

export { ver001 };
