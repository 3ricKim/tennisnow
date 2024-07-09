// Play.jsx
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MapMarkers from "./MapMarkers"; // Adjust path as needed
import "./Play.css";
import { GOOGLEMAP_KEY } from "../../../config";

export const Play = () => {
  const [datevalue, setDateValue] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  const [markers, setMarkers] = useState({});

  useEffect(() => {
    localStorage.setItem("selectedDate", datevalue.toISOString());
    console.log("Current date value:", datevalue);
  }, [datevalue]);

  const handleFind = () => {
    if (markers.title === undefined) {
      console.log("Please select a valid location")
    } else if (!datevalue) {
      console.log("Please select a valid date")
    } else {
      console.log("You have selected " + markers.title + " for " + datevalue);
    }
  };

  return (
    <div className="play-container">
      <header>
        <h3>Choose a Date and Location</h3>
      </header>
      <div className="calendar-container">
        <Calendar onChange={setDateValue} value={datevalue} />
      </div>
      <div className="map-container">
        <MapMarkers apiKey={GOOGLEMAP_KEY} setMarkers={setMarkers} />
      </div>
      <button onClick={handleFind}>Find a Partner</button>
    </div>
  );
};

export default Play;
