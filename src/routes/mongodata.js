import express from "express";
import db from "../services/mongo.js";

const mongodata_endpoint = express.Router();

mongodata_endpoint.get("/", async (req, res, next) => {
  try {
    if (!db) return res.status(500).send("Error connecting to the database");

    const year = req.query.year;
    if (!year) return res.status(500).send("Year parameter was not specified");
    if (2014 < parseInt(year) > 2023)
      return res
        .status(500)
        .send("Year must be between 2014 and 2023 inclusive");

    const municipality = req.query.municipality;

    let collection = await db.collection(`year_${year}`);
    let results = await collection
      .find(municipality ? { municipio_nombre: municipality } : {})
      .toArray();
    return res.status(200).send(results);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export { mongodata_endpoint };
