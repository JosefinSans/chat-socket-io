import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "../../context/SocketContext";

// import { useRoom } from "../RoomContext";
// import { useCount } from "../../context/UserCountContext";
// import { useOnlineStatus } from "../../context/useOnlineStatus";

function ChatPage() {
  // const { currentRoom } = useRoom();
  // const isOnline = useOnlineStatus();
  const socket = useSocket();
  const location = useLocation();
  // const { count, setCount } = useCount();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const prevLocationRef = useRef(location);

  const userID = localStorage.getItem("id");
  const navigate = useNavigate();
  function handleLeaveRoom() {
    navigate("/rooms");
    socket.emit("leaveRoom", location.state.id);
  }

  useEffect(() => {
    const fetchMessages = async (roomID) => {
      const response = await fetch(`http://localhost:5454/messages/${roomID}`);
      const data = await response.json();
      setMessages(data); // Реверсируем, чтобы последние сообщения были внизу
    };
    fetchMessages(location.state.id);

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });
    // if (!isOnline) {
    //   socket.emit("leaveRoom", location.state.id);
    // }
    // socket.on("userCount", (count) => {
    //   setCount(count);
    // });
    // socket.on("usersCount", (count) => {
    //   setCount(count);
    // });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  // useEffect(() => {
  // if (prevLocationRef.current.pathname !== location.pathname) {
  //   console.log("Маршрут изменился:", location.pathname);
  //   socket.emit("leaveRoom", location.state.id);
  //   // Здесь можно добавить вашу логику
  // }
  // // prevLocationRef.current = location;
  // console.log("Location changed!", location.pathname);
  // return () => {
  //   socket.off("leaveRoom");
  // };
  //   socket.emit("leaveRoom", location.state.id);
  // }, [location, socket]);

  function handleSendMessage() {
    if (message.trim()) {
      const newMessage = {
        roomID: location.state.id,
        text: message,
        name: localStorage.getItem("name"),
        id: Date.now(),
        userID: userID,
      };
      console.log("Sending message:", {
        room: location.state.id,
        message: newMessage,
      });
      socket.emit("sendMessage", {
        room: location.state.id,
        messageData: newMessage,
      });

      setMessage("");
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{location.state.id}</h1>
          <p className="text-gray-600"> participants</p>
        </div>
        <button
          onClick={handleLeaveRoom}
          className="bg-red-600 px-[10px] py-[5px] rounded-lg text-white"
        >
          Leave room
        </button>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              "mb-4 p-4 rounded-lg shadow-md bg-blue-200 text-right ml-auto"
            }
          >
            <p>
              <strong>
                {message.userID === userID ? <p>me</p> : <p>{message.name}</p>}
              </strong>{" "}
              {message.text}
            </p>
          </div>
        ))}
      </main>
      <footer className="bg-white p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="border border-gray-300 p-2 rounded w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
export default ChatPage;