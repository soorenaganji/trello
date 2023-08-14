import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  if (req.method !== "GET") {
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "User Is Not Authorized" });
  }
  const email = session.user.email;
  const userData = await User.findOne({ email: email.email });
  userData._doc.password = null;
  res.status(200).json({ status: "success", data: userData });
}
