import express from "express";

import { rdfParser } from "rdf-parse";
import { createReadStream } from "fs";

const rdf_local_endpoint = express.Router();

rdf_local_endpoint.get("/", async (req, res, next) => {
  try {
    const municipality = req.query.municipality;

    const filePath =
      "src/local_data/Dinamismo-Economico-Actividad-Municipalities.ttl";
    const fileStream = createReadStream(filePath);

    const quads = [];
    let current_l, current_i, current_y;

    rdfParser
      .parse(fileStream, {
        contentType: "text/turtle",
        baseIRI: "http://lodcoremadrid.es",
      })
      .on("data", (quad) => {
        quads.push(quad);
      })
      .on("error", (error) => {
        console.error(`An error occured: ${error}`);
        return res.status(500).send({ message: error.message });
      })
      .on("end", () => {
        let response = {};
        const label = `${municipality}`;
        response[label] = {};

        quads.forEach((quad) => {
          const subjectID = quad.subject.value.split("/").pop();
          [current_l, current_i, current_y] = subjectID.split("_");

          if (current_l === municipality) {
            if (!response[label][current_y]) response[label][current_y] = {};

            if (
              quad.predicate.value ===
              "http://www.w3.org/TR/rdf-syntax-grammar#value"
            ) {
              response[label][current_y][current_i] = quad.object.value;
            }
          }
        });
        return res.status(200).send(response);
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export { rdf_local_endpoint };
