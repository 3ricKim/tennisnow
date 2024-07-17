const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const courtRequestSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
  },
  { timestamps: true }
);

const CourtRequest = mongoose.model("CourtRequest", courtRequestSchema);

module.exports = CourtRequest;