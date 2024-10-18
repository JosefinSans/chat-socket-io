import React from "react";
import { useEffect, useState } from "react";
import ListBlock from "./ListBlock";
import ButtonsBlock from "./ButtonsBlock";

function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchrooms = async () => {
      const response = await fetch("http://localhost:5454/rooms");
      const data = await response.json();
      setRooms(data.reverse());
    };
    fetchrooms();
  }, [setRooms]);

  const name = localStorage.getItem("name");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Hello {name}! Available Chats:
      </h1>
      <ListBlock rooms={rooms} />
      <ButtonsBlock />
    </div>
  );
}
export default RoomListPage;
