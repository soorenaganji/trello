import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { verifyPassword } from "@/utils/auth";
const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (err) {
          console.log(err);
          throw new Error("Error in Connecting to DB");
        }
        if (!email || !password) {
          throw new Error("invalid Data!");
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) throw new Error("User doesn't exist ");
        const isPasswordValid = await verifyPassword(
          password,
          existingUser.password
        );
        if (!isPasswordValid) throw new Error("Username or Password incorrect");
        return { email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
