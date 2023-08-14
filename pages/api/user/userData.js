import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { verifyToken } from "../auth/login";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "User Is Not Authorized" });
  }
  const email = verifyToken(token, process.env.SECRET_KEY);
  const userData = await User.findOne({ email: email.email });
  userData._doc.password = null ;
  res.status(200).json({ status: "success", data: userData });
}
