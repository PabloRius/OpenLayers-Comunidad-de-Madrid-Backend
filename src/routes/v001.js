import express from "express";
import { mongodata_endpoint } from "./mongodata.js";

const ver001 = express.Router();

ver001.get("/", (req, res, next) => {
  res
    .status(404)
    .send(
      "API V0.0.1 endpoint reached, valid routes are: /api/{api_version}/{data_source}/{query} for more information check the documentation of the api on {API Swagger url WIP}"
    );
});

ver001.use("/mongodata", mongodata_endpoint);

export { ver001 };
