import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("you are already connected");
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected To DB");
    }
  } catch (err) {
    console.log("connection Unsuccessful");

  }
}
export default connectDB;
