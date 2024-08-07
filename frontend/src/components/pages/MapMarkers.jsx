// MapMarkers.jsx
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MapMarkers = ({ apiKey, setMarkers, distance }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    async function initMap() {
      try {
        const defaultLocation = { lat: 33.7756, lng: -84.3963 };

        const { Map, InfoWindow } = await window.google.maps.importLibrary(
          "maps"
        );
        const { AdvancedMarkerElement } =
          await window.google.maps.importLibrary("marker");

        const map = new Map(mapRef.current, {
          center: defaultLocation,
          zoom: 13 - Math.floor(distance / 10),
          mapId: "MAP_ID",
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
                radius: (distance * 1000).toString(),
                keyword: "tennis court",
                type: ["establishment"],
              };

              service.nearbySearch(request, (results, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  for (let i = 0; i < results.length; i++) {
                    if (results[i].name !== "Теннисный корт") {
                      createMarker(results[i]);
                    }
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

        const infoWindow = new InfoWindow();

        const createMarker = (place) => {
          if (place.geometry && place.geometry.location) {
            const marker = new AdvancedMarkerElement({
              map,
              position: place.geometry.location,
              title: place.name,
              gmpClickable: true,
            });

            marker.addListener("click", () => {
              const content = `
                <div>
                  <h3>${place.name}</h3>
                  <p>${place.vicinity}</p>
                </div>
              `;
              infoWindow.setContent(content);
              infoWindow.open(marker.map, marker);
              setMarkers(marker);
            });
            return { title: marker.title, position: marker.position };
          } else {
            console.error("Invalid place object:", place);
            return null;
          }
        };
      } catch (error) {
        console.error("Error initializing the map:", error);
      }
    }

    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps API not loaded.");
    }
  }, [apiKey, setMarkers, distance]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

MapMarkers.propTypes = {
  apiKey: PropTypes.string.isRequired,
  setMarkers: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
};

export default MapMarkers;
