import mongoose from "mongoose";
import express, { text } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { count, timeStamp } from "console";
import { type } from "os";
import axios from "axios";

const PORT = 5454;
const rooms = {};
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose
  .connect("mongodb://localhost:27017/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
    server.listen(PORT, () => {
      console.log("server has been started");
    });
  })
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  roomID: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
  text: String,
  name: String,
  id: Number,
  userID: String,
});

const RoomSchema = new Schema({
  name: String,
  countUsers: Number,
  online: Number,
});

const messageSchema = mongoose.model("messageShema", MessageSchema);
const roomSchema = mongoose.model("room", RoomSchema);

app.get("/messages/:roomID", async (req, res) => {
  const { roomID } = req.params;

  const messages = await messageSchema
    .find({ roomID })
    .sort({ timeStamp: 1 })
    .limit(50);
  res.json(messages);
});

app.post("/createroom", async (req, res) => {
  const { name, countUsers } = req.body;
  const newroom = new roomSchema({
    name,
    countUsers,
  });
  const room = await newroom.save();
  res.json(room);
});
app.get("/rooms", async (req, res) => {
  const rooms = await roomSchema.find().sort({ timeStamp: 1 });
  res.json(rooms);
});

app.delete("/rooms/:roomID", async (req, res) => {
  const { roomID } = req.params;
  await roomSchema.findByIdAndDelete(roomID);
  console.log(`${roomID} was deleted`);
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
      await axios.delete(
        `https://sonya-voice-chat-server.onrender.com/rooms/${roomID}`
      );
      console.log(`room delete ${roomID}`);
    }
    // } else {
    //   io.to(roomID)?.socket.emit("usersCount", userCount);
    // }
  });

  socket.on("disconnect", async () => {
    console.log("user dissconnected");

    socket.rooms.forEach(async (roomID) => {
      if (roomID !== socket.id) {
        socket.leave(roomID);
        const countUsers = io.sockets.adapter.rooms.get(roomID);

        if (!countUsers || countUsers.size === 0) {
          await axios.delete(
            `https://sonya-voice-chat-server.onrender.com/rooms/${roomID}`
          );
          console.log(`Room deleted: ${roomID}`);
        }
      }
    });
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
