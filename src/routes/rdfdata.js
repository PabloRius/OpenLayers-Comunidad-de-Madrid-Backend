import express from "express";

import { rdfParser } from "rdf-parse";
import { createReadStream } from "fs";

const rdf_local_endpoint = express.Router();

rdf_local_endpoint.get("/", async (req, res, next) => {
  try {
    const year = req.query.year;
    if (!year) return res.status(500).send("Year parameter was not specified");
    if (parseInt(year) < 2014 || parseInt(year) > 2023)
      return res
        .status(500)
        .send("Year must be between 2014 and 2023 inclusive");

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
        console.log(`${quad}`);
        quads.push(quad);
      })
      .on("error", (error) => {
        console.error(`An error occured: ${error}`);
        return res.status(500).send({ message: error.message });
      })
      .on("end", () => {
        console.log("All done!");
        let currentItem = {};
        quads.forEach((quad) => {
          const subjectID = quad.subject.value.split("/").pop();
          [current_l, current_i, current_y] = subjectID.split("_");

          if (current_y === year && current_l === municipality) {
            if (
              quad.predicate.value ===
              "http://www.w3.org/TR/rdf-syntax-grammar#value"
            ) {
              currentItem[current_i] = quad.object.value;
            }
          }
        });
        let response = {};
        const label = `${municipality}_${year}`;
        response[label] = currentItem;
        return res.status(200).send(response);
      });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export { rdf_local_endpoint };
