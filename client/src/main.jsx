import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./SocketContext";
import { BrowserRouter as Router } from "react-router-dom";
import { RoomProvider } from "./RoomContext.jsx";
import { UserProvider } from "./UserCountContext.jsx";
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
