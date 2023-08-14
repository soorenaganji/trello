import User from "@/models/user";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") {
    return 
  } else {
    try {
      await connectDB();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "failed", message: "Error in connecting to Database" });
    }
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password ) {
        return res
        .status(422)
        .json({ status: "failed", message: "one or couple of the fields are empty" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(422)
        .json({ status: "failed", message: "This User Already Exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      name,
      lastName,
    });
    res
      .status(201)
      .json({
        status: "success",
        message: "user created successfully",
        data: newUser,
      });
  }
}
export default handler;
