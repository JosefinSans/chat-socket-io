import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(
      "mongodb+srv://filcinasona:1C5SSfgMrj30K0wJ@cluster0.mptdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
}
