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

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6378; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

app.get("/search-courtrequest", async (req, res) => {
  const { date, userId, latitude, longitude } = req.query;
  const searchDate = new Date(date);

  try {
    const courtRequests = await CourtRequest.find({
      date: searchDate,
      userid: { $ne: userId }
    });

    // Filter court requests based on proximity
    const filteredCourtRequests = courtRequests.filter(request => {
      const distance = calculateDistance(
        latitude, longitude,
        request.location.latitude, request.location.longitude
      );

      return distance <= 5;
    });

    res.status(200).json(filteredCourtRequests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch court requests" });
  }
});
