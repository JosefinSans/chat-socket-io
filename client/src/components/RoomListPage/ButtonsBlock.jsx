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
    <div className="flex mt-[30px] flex-row text-xl gap-4">
      <button
        onClick={handleDisconnect}
        className="bg-red-600 px-[10px] py-[5px] rounded-lg text-white"
      >
        Leave
      </button>{" "}
      <button
        onClick={handleCreateRoom}
        className="bg-green-400 px-[10px] py-[5px] rounded-lg text-white"
      >
        create new room
      </button>
    </div>
  );
}
