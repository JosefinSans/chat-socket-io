import React from "react";
import { useContext, createContext, useState } from "react";

const UsersContext = createContext();

export function UserProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <UsersContext.Provider value={{ count, setCount }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useCount = () => useContext(UsersContext);
