import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MapMarkers from "./MapMarkers"; // Adjust path as needed
import "./Play.css";
import { GOOGLEMAP_KEY } from "../../../config";

export const Play = () => {
  const [value, setValue] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  useEffect(() => {
    localStorage.setItem("selectedDate", value.toISOString());
    console.log("Current date value:", value);
  }, [value]);

  return (
    <div className="play-container">
      <header>
        <h3>Choose a Date and Location</h3>
      </header>
      <div className="calendar-container">
        <Calendar onChange={setValue} value={value} />
      </div>
      <div className="map-container">
        <MapMarkers apiKey={GOOGLEMAP_KEY} />
      </div>
      <button onClick={()=>console.log("HI" + value)}>Find a Partner</button>
    </div>
  );
};

export default Play;
