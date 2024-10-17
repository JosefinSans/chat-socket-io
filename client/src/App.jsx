// import { useState } from "react";
// import { io } from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import AuthenticationHomePage from "./components/HomePage";
import ChatList from "./components/ChatList";
import ChatPage from "./components/ChatPage";
import CreateRoom from "./components/CreateRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationHomePage />} />

      <Route path="/rooms" element={<ChatList />} />

      <Route path="/chat" element={<ChatPage />} />
      <Route path="/create" element={<CreateRoom />} />
    </Routes>
  );
}

export default App;
