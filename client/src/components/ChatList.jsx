import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../SocketContext";
import { useRoom } from "../RoomContext";

function ChatList() {
  const socket = useSocket();
  const { currentRoom, setCurrentRoom } = useRoom();
  // const { count } = useCount();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchrooms = async () => {
      const response = await fetch(
        "https://sonya-voice-chat-server.onrender.com/rooms"
      );
      const data = await response.json();
      setRooms(data.reverse());
    };
    fetchrooms();
  }, [setRooms]);
  function handleChoseRoom(id) {
    // navigate("/Chat");
    socket.emit("joinRoom", id);
    navigate("/Chat");
    setCurrentRoom(id);

    // window.location.reload();
    //
  }

  function handleDisconnect() {
    navigate("/");
    socket?.disconnect();
  }

  function handleCreateRoom() {
    navigate("/create");
  }

  const name = localStorage.getItem("name");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Hello {name}! Available Chats:
      </h1>
      <ul className="w-full max-w-md bg-white rounded-lg shadow-md">
        {rooms.map((chat) => (
          <li
            // onClick={() => handleChoseRoom(chat._id)}
            key={chat._id}
            className="border-b last:border-b-0"
          >
            <p
              // onClick={() => handleChoseRoom(chat._id)}
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
    </div>
  );
}
export default ChatList;
