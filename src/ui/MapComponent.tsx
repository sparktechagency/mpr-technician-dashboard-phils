/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { getGoogleMapsApiKey } from "../helpers/config/envConfig";

// Define the shape of the props for type safety
interface MapProps {
  lat: number;
  lng: number;
  zoom?: number; // Optional zoom level, defaults to 14
  height?: string | number; // Optional height for the map container
}

// Function to load the Google Maps script dynamically
const loadScript = (url: string) => {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  document.head.appendChild(script);
  return script;
};

const MapComponent: React.FC<MapProps> = ({
  lat,
  lng,
  zoom = 14,
  height = "400px",
}) => {
  const apiKey = getGoogleMapsApiKey();
  // Ref to hold the DOM element where the map will be rendered
  const mapRef = useRef<HTMLDivElement>(null);
  // State to track if the Google Maps API script is loaded
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Define the callback function name globally (required by Google Maps API)
  // This is a common pattern when loading the API script
  const callbackName = "initMapCallback";

  // 1. Script Loading Effect
  useEffect(() => {
    // Check if the script is already loaded
    if (window.google?.maps) {
      setScriptLoaded(true);
      return;
    }

    // Set up the global callback function
    (window as any)[callbackName] = () => {
      setScriptLoaded(true);
      // Clean up the global function after successful load
      delete (window as any)[callbackName];
    };

    // Construct the API URL
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
    const script = loadScript(scriptUrl);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
      delete (window as any)[callbackName];
    };
  }, [apiKey]);

  // 2. Map Initialization and Marker Placement Effect
  useEffect(() => {
    // Only proceed if the script is loaded and the map container is available
    if (scriptLoaded && mapRef.current && window.google) {
      const google = window.google;
      const mapCenter = { lat, lng };

      // Create the map instance
      const map = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: zoom,
        // Optional: add map type control, etc.
        mapTypeControl: false,
        streetViewControl: false,
      });

      // Place a marker on the map
      new google.maps.Marker({
        position: mapCenter,
        map: map,
        title: "Your Location",
      });
    }
  }, [scriptLoaded, lat, lng, zoom]); // Re-run if script loads or lat/lng/zoom props change

  // 3. Render the Map Container
  return (
    <div
      className="w-full bg-gray-200 rounded-lg shadow-md"
      style={{ height: height }}
    >
      {/* The ref is crucial here to connect the DOM element with the Google Maps API */}
      <div ref={mapRef} className="w-full h-full">
        {!scriptLoaded && (
          <div className="flex items-center justify-center w-full h-full text-gray-600">
            Loading Map...
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
