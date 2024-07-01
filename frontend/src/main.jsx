import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import {APIProvider} from '@vis.gl/react-google-maps';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const GOOGLEMAP_KEY = import.meta.env.VITE_GOOGLEMAP_APIKEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

if (!GOOGLEMAP_KEY) {
  throw new Error("Missing Google Map API Key")
}



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <APIProvider apiKey={GOOGLEMAP_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </APIProvider>
    </ClerkProvider>
  </React.StrictMode>
);


