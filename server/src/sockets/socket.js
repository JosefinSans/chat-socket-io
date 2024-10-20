import axios from "axios";
import { messageSchema } from "../models/messageModel.js";
import { roomSchema } from "../models/roomModel.js";
import { Server } from "socket.io";
import cors from "cors";
import { app } from "../index.js";
export const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // console.log(io.sockets.adapter.rooms.has("67145c192e7d18b737bf52b8"));
    console.log("user connected " + socket.id);

    socket.on("joinRoom", async (roomID) => {
      socket.join(roomID);
      console.log(`user ${socket.id} connected ro ${roomID}`);
      // console.log(countUsers.size);
      const countUsers = io.sockets.adapter.rooms.get(roomID);
      countUsers &&
        (await roomSchema.updateOne(
          { _id: roomID },
          { $set: { online: countUsers.size } }
        ));

      io.to(roomID).emit("roomData", { userCount: countUsers.size });
    });
    socket.on("leaveRoom", async (roomID) => {
      socket.leave(roomID);
      const countUsers = io.sockets.adapter.rooms.get(roomID);
      console.log(`user leaved room ${roomID}`);
      // if (rooms[roomID]) {
      //   rooms[roomID]--;

      countUsers &&
        (await roomSchema.updateOne(
          { _id: roomID },
          { $set: { online: countUsers.size } }
        ));

      // io.to(roomID).emit("roomData", { userCount: rooms[roomID] });

      if (!countUsers || countUsers.size === 0) {
        await axios.delete(`http://localhost:5454/rooms/${roomID}`);
        console.log(`room delete ${roomID}`);
      }
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

    socket.on("disconnect", async () => {
      console.log("User disconnected: " + socket.id);

      const isExistCheck = (key) => {
        return io.sockets.adapter.rooms.has(key.toString());
      };

      try {
        const items = await roomSchema.find();

        const validItems = items.filter((item) => isExistCheck(item._id));

        const invalidItemIds = items
          .filter((item) => !isExistCheck(item._id))
          .map((item) => item._id);

        if (invalidItemIds.length > 0) {
          await roomSchema.deleteMany({ _id: { $in: invalidItemIds } });
          console.log(`Удалены комнаты с ID: ${invalidItemIds.join(", ")}`);
        }
      } catch (error) {
        console.error("Ошибка при удалении комнат:", error);
      }
    });
  });
};
