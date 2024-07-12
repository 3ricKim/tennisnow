// Play.jsx
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MapMarkers from "./MapMarkers"; // Adjust path as needed
import "./Play.css";
import { GOOGLEMAP_KEY } from "../../../config";
import { useUser } from "@clerk/clerk-react";

export const Play = () => {
  const [datevalue, setDateValue] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  const [markers, setMarkers] = useState({});
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    localStorage.setItem("selectedDate", datevalue.toISOString());
  }, [datevalue]);

  const saveToDatabase = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/add-courtrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFind = () => {
    if (markers.title === undefined) {
      console.log("Please select a valid location");
    } else if (!datevalue) {
      console.log("Please select a valid date");
    } else if (datevalue < new Date()) {
      console.log("Selected date has passed");
    } else {
      if (!isLoaded || !isSignedIn) {
        console.log("Please log in");
      } else {
        const data = {
          userid: user.id,
          location: {
            title: markers.title,
            latitude: markers.position.lat,
            longitude: markers.position.lng,
          },
          date: datevalue.toISOString(),
        };
        saveToDatabase(data);
        console.log("You have selected " + markers.title + " for " + datevalue);
      }
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
