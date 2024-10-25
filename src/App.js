import React, { Profiler, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {   HelmetProvider } from "react-helmet-async";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about";
import Css from "./pages/css";
import Javascript from "./pages/javascript";
import ThemeContext from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import P404 from "./pages/P404";
import EditTask from "./pages/editTask/editTask";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<P404/>,
  },

  {
    path: "/about",
    element: <About/>,
  },

  {
    path: "/css",
    element: <Css />,
  },
  {
    path: "/javascript",
    element: <Javascript />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-task",
    element: <EditTask />,
  },
]);

function App() {
  const {theme} = useContext(ThemeContext)
  return(
    <div  className={`${theme}`}>
    <RouterProvider router={router} />
    </div>
  )
}

export default App;
