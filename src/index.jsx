import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Router from "./router";
import React from "react";
import { KeyboardControls } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
