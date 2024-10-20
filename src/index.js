import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {   HelmetProvider } from "react-helmet-async";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
// import About from "./pages/html";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
//Level 2
import {ThemeProvider} from "./context/ThemeContext";
import App from "./App";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
          <App/>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
