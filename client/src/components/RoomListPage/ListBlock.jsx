import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useRoom } from "../../context/RoomContext";
import { useNavigate } from "react-router-dom";

export default function ListBlock({ rooms }) {
  const navigate = useNavigate();
  const { setCurrentRoom } = useRoom();
  const socket = useSocket();

  function handleChoseRoom(id) {
    setCurrentRoom(id);
    socket.emit("joinRoom", id);
    navigate("/Chat", { state: { id: id } });
  }

  return (
    <ul className="w-full max-w-md bg-white rounded-lg shadow-md">
      {rooms.map((chat) => (
        <li key={chat._id} className="border-b last:border-b-0">
          <p
            className={`block p-4 ${
              chat.online === chat.countUsers
                ? "bg-slate-400"
                : "hover:bg-gray-200 transition"
            }`}
          >
            {chat.name}{" "}
            {chat.online ? (
              <span className="ml-[50px]">
                online: <span>{chat.online}</span>/{chat.countUsers}
              </span>
            ) : (
              <span>JUST CREATED, lets join first!</span>
            )}
            {chat.online === chat.countUsers ? null : (
              <button onClick={() => handleChoseRoom(chat._id)}>
                joinRoom
              </button>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
