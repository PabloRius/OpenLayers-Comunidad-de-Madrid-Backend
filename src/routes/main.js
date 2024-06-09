import express from "express";
import { ver001 } from "./v001";

const base_router = express.Router();

base_router.get((req, res, next) => {
  res
    .status(404)
    .send(
      "Invalid endpoint, valid routes are: /api/{api_version}/{data_source}/{query} for more information check the documentation of the api on {API Swagger url WIP}"
    );
});

base_router.use("/api", ver001);

export { base_router };
