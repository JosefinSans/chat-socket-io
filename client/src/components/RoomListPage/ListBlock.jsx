import React from "react";
import { useRoom } from "../../context/RoomContext";
import { useNavigate } from "react-router-dom";

export default function ListBlock({ rooms }) {
  const navigate = useNavigate();
  function handleChoseRoom(id) {
    navigate("/Chat", { state: { id: id } });
  }

  return (
    <ul className="w-full max-w-md z-40 bg-white rounded-lg shadow-md">
      {rooms.map((chat) => (
        <li key={chat._id} className="border-b last:border-b-0">
          <div
            className={`mx-3 flex flex-row justify-between  align-center p-4 ${
              chat.online === chat.countUsers ? "bg-slate-400" : ""
            }`}
          >
            <div className="text-2xl">{chat.name}</div>
            <div>
              {chat.online && (
                <span className="ml-[50px] text-xl ">
                  limit: <span>{chat.online}</span>/{chat.countUsers}
                </span>
              )}
            </div>
            {chat.online === chat.countUsers ? null : (
              <button
                className="text-gray-700 text-2xl"
                onClick={() => handleChoseRoom(chat._id)}
              >
                JOIN
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
