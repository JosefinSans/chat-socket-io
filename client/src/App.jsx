import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RoomListPage from "./components/RoomListPage/RoomListPage";
import ChatPage from "./components/ChatPage/ChatPage";
import CreateRoomPage from "./components/CreateRoomPage/CreateRoomPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/rooms" element={<RoomListPage />} />

      <Route path="/chat" element={<ChatPage />} />
      <Route path="/create" element={<CreateRoomPage />} />
    </Routes>
  );
}

export default App;
