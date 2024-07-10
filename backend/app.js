const express = require("express");
const mongoose = require("mongoose");
const CourtRequest = require("./courtRequest");

const app = express();

const dbURI =
  "mongodb+srv://erickim2281:VvTKlqSFr2J2l6mW@cluster0.kohk93t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get("/add-courtrequest", (req, res) => {
  const courtrequest = new CourtRequest({
    username: "Bob",
    location: {
      title: "House",
      latitude: 12.3131,
      longitude: 33.232,
    },
    date: "12/23/2024",
  });
  courtrequest
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
