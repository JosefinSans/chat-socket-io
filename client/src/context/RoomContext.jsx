import React from "react";
import { useContext, createContext, useState } from "react";

const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <RoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
      {children}
    </RoomContext.Provider>
  );
}

export const useRoom = () => useContext(RoomContext);
