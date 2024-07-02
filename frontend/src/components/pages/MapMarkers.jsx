import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const MapMarkers = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const initMap = () => {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 12,
        });

        const service = new window.google.maps.places.PlacesService(map);
        const request = {
          location: map.getCenter(),
          radius: '5000',
          keyword: 'tennis court',
          type: ['establishment']
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