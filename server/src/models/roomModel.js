import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  countUsers: Number,
  online: Number,
});
export const roomSchema = mongoose.model("room", RoomSchema);
