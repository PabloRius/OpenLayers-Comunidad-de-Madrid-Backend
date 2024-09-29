import express from "express";

import { rdfParser } from "rdf-parse";
import { createReadStream } from "fs";

const rdf_local_endpoint = express.Router();

rdf_local_endpoint.get("/", async (req, res, next) => {
  try {
    const municipality = req.query.municipality;
    const year = req.query.year;

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

        if (municipality) {
          const label = `${municipality}`;
          response[label] = {};

          quads.forEach((quad) => {
            const subjectID = quad.subject.value.split("/").pop();
            [current_l, current_i, current_y] = subjectID.split("_");

            if (current_l === municipality) {
              if (!response[label][current_y]) response[label][current_y] = {};
              if (
                quad.predicate.value ===
                "http://www.w3.org/2001/XMLSchema#decimal"
              ) {
                console.log(quad.object.value);
                response[label][current_y][current_i] = quad.object.value;
              }
            }
          });
        } else if (year) {
          quads.forEach((quad) => {
            const subjectID = quad.subject.value.split("/").pop();
            [current_l, current_i, current_y] = subjectID.split("_");

            if (current_y === year) {
              if (!response[current_l]) response[current_l] = {};
              if (
                quad.predicate.value ===
                "http://www.w3.org/2001/XMLSchema#decimal"
              ) {
                response[current_l][current_i] = quad.object.value;
              }
            }
          });
        } else {
          return res
            .status(400)
            .send({ message: "Municipality or year must be specified" });
        }
        return res.status(200).send(response);
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export { rdf_local_endpoint };
