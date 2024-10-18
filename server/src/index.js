import express from "express";
import http from "http";
import cors from "cors";
import { messageSchema } from "./models/messageModel.js";
import { roomSchema } from "./models/roomModel.js";
import connectDB from "./config/db.js";
import { socketHandler } from "./sockets/socket.js";

const PORT = 5454;

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
socketHandler(server);

connectDB();

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

server.listen(PORT, () => {
  console.log("server has been started");
});
