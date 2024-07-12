const express = require("express");
const mongoose = require("mongoose");
const CourtRequest = require("./courtRequest");
const cors = require("cors");

const app = express();
const dbURI =
  "mongodb+srv://erickim2281:VvTKlqSFr2J2l6mW@cluster0.kohk93t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(cors());

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.post("/add-courtrequest", (req, res) => {
  const courtrequest = new CourtRequest(req.body);
  courtrequest
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to save court request" });
    });
});
