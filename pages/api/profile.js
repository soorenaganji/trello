import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";
import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
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

  let user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }
  if(req.method === "GET"){

    return res.status(200).json({status : "success" ,data : { name : user.name , lastName : user.lastName , email : user.email}})
  }if(req.method === "PATCH") {
    const {name , lastName , email} = req.body.data;
     console.log(name)
    if(!name || !lastName || !email) {
        return res.status(401).json({status : "401" , message : "invalid data"})
    }
    user.name = name
    user.lastName = lastName
    user.email = email
    user.save()
    
    return res.status(201).json({status : "success" , message : "User Updated Successfully"})
  }
}
export default handler;