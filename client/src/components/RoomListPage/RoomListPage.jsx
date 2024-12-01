import React from "react";
import { useEffect, useState } from "react";
import ListBlock from "./ListBlock";
import ButtonsBlock from "./ButtonsBlock";
import { useRoom } from "../../context/RoomContext";
import { useSocket } from "../../context/SocketContext";
import AnimatedBackground from "../../bg-animate/AnimatedBackground";

function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  const { currentRoom } = useRoom();
  const socket = useSocket();

  useEffect(() => {
    currentRoom && socket.emit("leaveRoom", currentRoom);
    const fetchrooms = async () => {
      const response = await fetch(
        "https://chat-socket-io-6.onrender.com/rooms"
      );
      const data = await response.json();
      setRooms(data.reverse());
    };
    fetchrooms();
  }, [setRooms]);

  const name = localStorage.getItem("name");

  return (
    <div className="flex font-main flex-col items-center justify-center  relative  h-screen bg-gray-900">
      <AnimatedBackground />
      <div className="bg-white bg-opacity-5 p-16  rounded-lg flex flex-col items-center justify-center ">
        <h1 className="text-4xl text-gray-200 font-bold mb-6">
          Hi <span className="text-bold">{name}!</span>{" "}
          <span className="text-3xl text-fuchsia-600">Join To Room ↓</span>
        </h1>
        <ListBlock rooms={rooms} />
        <ButtonsBlock />
      </div>
    </div>
  );
}
export default RoomListPage;
