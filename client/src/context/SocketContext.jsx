import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:5454");
  //   // newSocket.connect();
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, []);
  const socket = io("http://localhost:5454");
  socket.connect();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
export function useSocket() {
  return useContext(SocketContext);
}
