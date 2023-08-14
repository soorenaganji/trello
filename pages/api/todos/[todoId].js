import connectDB from "../../../utils/connectDB";
import { getSession } from "next-auth/react";
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }
  
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }
  if(req.method === "DELETE"){
  const {todoId} = req.query
  const todoIndex = user.todos.findIndex((todo) => todo._id.toString() === todoId);

  // Check if the todo exists
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  // Remove the todo from the todos array
  user.todos.splice(todoIndex, 1);

  // Save the updated user
  await user.save();

  return res.status(200).json({ message: 'Todo deleted successfully' });
}
}
export default handler;