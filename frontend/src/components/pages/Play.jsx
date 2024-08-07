import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import MapMarkers from "./MapMarkers";
import "./Play.css";
import { GOOGLEMAP_KEY } from "../../../config";
import { useUser } from "@clerk/clerk-react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export const Play = () => {
  const [datevalue, setDateValue] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });
  const [markers, setMarkers] = useState({});
  const [courtRequests, setCourtRequests] = useState([]);
  const [radius, setRadius] = useState(5);
  const [expandedLocation, setExpandedLocation] = useState(null);

  const { isSignedIn, user, isLoaded } = useUser();
  const USER_ID_PLACEHOLDER = "TEMP_USER_ID2";

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

  const searchCourtRequests = async (date) => {
    try {
      const response = await fetch(
        `http://localhost:3000/search-courtrequest?date=${date.toISOString()}&userId=${USER_ID_PLACEHOLDER}&latitude=${
          markers.position.lat
        }&longitude=${markers.position.lng}&radius=${radius}`
      );
      const result = await response.json();
      setCourtRequests(result);
    } catch (error) {
      console.error("Error fetching court requests:", error);
    }
  };
  const handleFind = () => {
    if (!markers.title) {
      console.log("Please select a valid location");
    } else if (!datevalue) {
      console.log("Please select a valid date");
    } else if (datevalue < new Date()) {
      console.log("Selected date has passed");
    } else {
      if (!isLoaded || !isSignedIn) {
        console.log("Please log in");
      } else if (!user.username) {
        console.log("Create a username");
      } else {
        console.log(typeof user.primaryEmailAddress.emailAddress);
        const data = {
          userid: USER_ID_PLACEHOLDER,
          username: user.username,
          useremail: user.primaryEmailAddress.emailAddress,
          location: {
            title: markers.title,
            latitude: markers.position.lat,
            longitude: markers.position.lng,
          },
          date: datevalue.toISOString(),
        };
        saveToDatabase(data);
        searchCourtRequests(datevalue);
        console.log("You have selected " + markers.title + " for " + datevalue);
      }
    }
  };

  const handleSlider = (event, newRadius) => {
    setRadius(newRadius);
  };

  const toggleLocation = (location) => {
    setExpandedLocation(expandedLocation === location ? null : location);
  };

  // Group court requests by location
  const groupedRequests = courtRequests.reduce((acc, request) => {
    const location = request.location.title;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(request);
    return acc;
  }, {});
  return (
    <div className="play-container">
      <header className="header-container">
        <h3>Choose a Date and Location</h3>
        <p>We&apos;ll find the perfect tennis partner for you</p>
      </header>
      <div className="calendar-container">
        <Calendar onChange={setDateValue} value={datevalue} />
      </div>
      <div className="map-container">
        <MapMarkers
          apiKey={GOOGLEMAP_KEY}
          setMarkers={setMarkers}
          distance={radius}
        />
      </div>
      <div className="controls-container">
        <div id="courts-within">Courts search radius (km):</div>
        <Box sx={{ width: 300 }} className="slider-container">
          <Slider
            valueLabelDisplay="auto"
            step={5}
            min={5}
            max={25}
            defaultValue={5}
            onChange={handleSlider}
          ></Slider>
        </Box>
        <button onClick={handleFind} className="findbutton">
          Find a Partner
        </button>
      </div>
      <div className="courtrequests">
        <h3>
          Court Requests on {datevalue.toDateString()} within {radius}km
        </h3>
        <ul>
          {Object.keys(groupedRequests).map((location) => (
            <li key={location}>
              <div onClick={() => toggleLocation(location)}>
                Location: {location}
              </div>
              {expandedLocation === location && (
                <ul>
                  {groupedRequests[location].map((request) => (
                    <li key={request._id}>
                      User: {request.username}, Email: {request.useremail}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Play;
