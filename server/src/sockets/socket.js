import axios from "axios";
import { messageSchema } from "../models/messageModel.js";
import { roomSchema } from "../models/roomModel.js";
import { Server } from "socket.io";
import cors from "cors";
const rooms = {};

export const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("joinRoom", async (roomID) => {
      socket.join(roomID);
      console.log(`user connected ro ${roomID}`);
      if (!rooms[roomID]) {
        rooms[roomID] = 0;
      }
      rooms[roomID]++;

      await roomSchema.updateOne(
        { _id: roomID },
        { $set: { online: rooms[roomID] } }
      );

      io.to(roomID).emit("roomData", { userCount: rooms[roomID] });
    });
    socket.on("leaveRoom", async (roomID) => {
      socket.leave(roomID);

      console.log(`user leaved room ${roomID}`);
      if (rooms[roomID]) {
        rooms[roomID]--;

        await roomSchema.updateOne(
          { _id: roomID },
          { $set: { online: rooms[roomID] } }
        );

        io.to(roomID).emit("roomData", { userCount: rooms[roomID] });
      }

      const countUsers = io.sockets.adapter.rooms.get(roomID);

      if (!countUsers || countUsers.size === 0) {
        await axios.delete(`http://localhost:5454/rooms/${roomID}`);
        console.log(`room delete ${roomID}`);
      }
    });
    socket.on("disconnect", async () => {
      console.log("user dissconnected");
    });
    socket.on("sendMessage", async ({ room, messageData }) => {
      try {
        const message = new messageSchema(messageData);
        await message.save();

        io.to(room).emit("newMessage", message);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
