import express from "express";
import mongoose from "mongoose";

const uri = "mongodb://root:example@localhost:27017/mydatabase";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const mongodata_endpoint = express.Router();

mongodata_endpoint.get("/", (req, res, next) => {
  res.send("You got here!!!");
});

export { mongodata_endpoint };
