import connectDB from "../../../utils/connectDB";
import { getSession } from "next-auth/react";
import User from "@/models/user";
import sortTodos from "@/utils/sortTodos";

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

  if (req.method === "POST") {
    const { title, status , description } = req.body;
    if (!title || !status ) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    user.todos.push({ title, status , description });
    user.save();

    res.status(201).json({ status: "success", message: "Todo created!" });
  } 
  if(req.method === "GET"){
    const userTodos = await user.todos
    const sortedData = sortTodos(userTodos)
    res.status(200).json({status : "success" , data : sortedData})
  }
  else if (req.method === "PATCH"){
    const {id , status} = req.body
    if(!id || !status){
      return res.status(401).json({status : "401" , message : "invalid data"})
    }
    const result = await User.updateOne({"todos._id" : id} , {$set : {"todos.$.status" : status}})

    res.status(200).json({status : "success"})
  }
  else if (req.method === "PUT"){
    const {_id , title} = req.body
    if(!_id || !title){
      return res.status(401).json({status : "401" , message : "invalid data"})
    }
    const result = await User.updateOne({"todos._id" : _id} , {$set : {"todos.$.title" : title}})

    res.status(200).json({status : "success"})
  }
}

export default handler;