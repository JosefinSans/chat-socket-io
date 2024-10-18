import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect("mongodb://localhost:27017/chat", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
}
