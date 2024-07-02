import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MapMarkers from "./MapMarkers"; // Adjust path as needed
import "./Play.css";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLEMAP_APIKEY;

export const Play = () => {
  const [value, setValue] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  useEffect(() => {
    localStorage.setItem("selectedDate", value.toISOString());
    console.log("Current date value:", value);
  }, [value]);

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing Google Map API Key");
  }

  return (
    <div className="play-container">
      <header>
        <h3>Choose a Date and Location</h3>
      </header>
      <div className="calendar-container">
        <Calendar onChange={setValue} value={value} />
      </div>
      <div className="map-container">
        <MapMarkers apiKey={GOOGLE_MAPS_API_KEY} />
      </div>
    </div>
  );
};

export default Play;
