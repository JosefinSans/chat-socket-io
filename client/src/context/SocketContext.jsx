import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const socket = io("https://chat-socket-io-6.onrender.com");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
export function useSocket() {
  return useContext(SocketContext);
}
