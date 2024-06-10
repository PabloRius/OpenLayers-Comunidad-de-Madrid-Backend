import express from "express";
import { ver001 } from "./v001.js";

const api = express.Router();

api.get("/", (req, res, next) => {
  res
    .status(404)
    .send(
      "Data API reached, valid routes are: /api/{api_version}/{data_source}/{query} for more information check the documentation of the api on {API Swagger url WIP}"
    );
});

api.use("/v0.0.1", ver001);

export { api };
