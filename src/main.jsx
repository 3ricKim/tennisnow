import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Shoes from "./pages/Shoes";
import Rackets from "./pages/Rackets";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "rackets",
    element: <Rackets />,
  },
  {
    path: "shoes",
    element: <Shoes />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
