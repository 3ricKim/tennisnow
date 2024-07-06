import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import {APIProvider} from '@vis.gl/react-google-maps';
import { PUBLISHABLE_KEY, GOOGLEMAP_KEY } from "../config";


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


