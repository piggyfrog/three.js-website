import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Router from "./router";
import React from "react";
import { KeyboardControls } from "@react-three/drei";
import "./i18n";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: "forwardKeyPressed", keys: ["KeyW"] },
        { name: "rightKeyPressed", keys: ["KeyD"] },
        { name: "backwardKeyPressed", keys: ["KeyS"] },
        { name: "leftKeyPressed", keys: ["KeyA"] },
        { name: "selectUp", keys: ["ArrowUp"] },
        { name: "selectDown", keys: ["ArrowDown"] },
        { name: "nextPage", keys: ["ArrowRight"] },
        { name: "select", keys: ["Space"] },
        { name: "closeDialog", keys: ["KeyQ"] },
        { name: "toggleSound", keys: ["KeyM"] },
        { name: "toggleSetting", keys: ["KeyE"] },
      ]}
    >
      <Router />
    </KeyboardControls>
  </React.StrictMode>
);
