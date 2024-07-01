import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Map } from "@vis.gl/react-google-maps";

import "./Play.css";

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
      <div className="calandar-container">
        <Calendar onChange={setValue} value={value} />
      </div>
      <div className="map-container">
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev) => {
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            );
          }}
        ></Map>
      </div>
    </div>
  );
};
// features for meeting casual player, finding/hosting tournament, finding court
export default Play;
