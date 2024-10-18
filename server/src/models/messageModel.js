import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  roomID: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
  text: String,
  name: String,
  id: Number,
  userID: String,
});

export const messageSchema = mongoose.model("messageShema", MessageSchema);
