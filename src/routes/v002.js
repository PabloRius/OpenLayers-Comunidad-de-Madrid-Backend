import express from "express";
import { rdf_local_endpoint } from "./rdfdata.js";

const ver002 = express.Router();

ver002.get("/", (req, res, next) => {
  res
    .status(404)
    .send(
      "API V0.0.2 endpoint reached, valid routes are: /api/{api_version}/{data_source}/{query} for more information check the documentation of the api on {API Swagger url WIP}"
    );
});

ver002.use("/local", rdf_local_endpoint);

export { ver002 };
