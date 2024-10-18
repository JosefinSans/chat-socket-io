import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [participantLimit, setParticipantLimit] = useState("");

  const handleCreateRoom = async () => {
    if (participantLimit < 2) {
      alert("Participant limit must be at least 2");
      return;
    }
    const res = await axios.post("http://localhost:5454/createroom", {
      name: roomName,
      countUsers: participantLimit,
    });

    navigate("/rooms");
    console.log("Room created:", res.data._id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Create Room</h1>
      </header>
      <main className="flex-1 p-4 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <input
            type="number"
            placeholder="Participant Limit"
            value={participantLimit}
            onChange={(e) => setParticipantLimit(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
          >
            Create Room
          </button>
        </div>
      </main>
      <footer className="bg-white p-4 text-center">
        <p className="text-gray-600">Ready to start chatting?</p>
      </footer>
    </div>
  );
};

export default CreateRoomPage;
