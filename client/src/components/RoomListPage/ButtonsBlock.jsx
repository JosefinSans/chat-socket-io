import React from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

export default function ButtonsBlock() {
  const socket = useSocket();
  const navigate = useNavigate();

  function handleDisconnect() {
    navigate("/");
    socket?.disconnect();
  }
  function handleCreateRoom() {
    navigate("/create");
  }

  return (
    <div className="flex mt-[30px] flex-col text-3xl z-50 w-[300px] gap-4">
      {" "}
      <button
        onClick={handleCreateRoom}
        className="bg-gray-700 p-2 rounded-md text-white"
      >
        create new room
      </button>
      <button
        onClick={handleDisconnect}
        className="bg-fuchsia-500 p-2 rounded-md text-white"
      >
        Leave
      </button>
    </div>
  );
}
