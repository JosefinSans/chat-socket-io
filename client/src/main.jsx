import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./context/SocketContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { RoomProvider } from "./context/RoomContext.jsx";
import { UserProvider } from "./context/UserCountContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <RoomProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </RoomProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
