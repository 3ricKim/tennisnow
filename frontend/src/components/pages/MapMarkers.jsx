import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const MapMarkers = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      try {
        const defaultLocation = { lat: 33.7756, lng: -84.3963 };
        const { Map } = await window.google.maps.importLibrary("maps");

        const map = new Map(mapRef.current, {
          center: defaultLocation,
          zoom: 12,
        });
  
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              map.setCenter(userLocation);
  
              const service = new window.google.maps.places.PlacesService(map);
              const request = {
                location: userLocation,
                radius: "5000",
                keyword: "tennis court",
                type: ["establishment"],
              };
  
              service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                  }
                } else {
                  console.error("PlacesServiceStatus Error:", status);
                }
              });
            },
            (error) => {
              console.error("Error getting user location:", error);
              map.setCenter(defaultLocation);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
          map.setCenter(defaultLocation);
        }
  
        const createMarker = (place) => {
          if (place.geometry && place.geometry.location) {
            new window.google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name,
            });
          } else {
            console.error("Invalid place object:", place);
          }
        };
      } catch (error) {
        console.error("Error initializing the map:", error);
      }
    };
  
    // Initialize the map immediately since the script is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps API not loaded.");
    }
  }, [apiKey]);
  

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

MapMarkers.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default MapMarkers;