import { verifyToken } from "@/pages/api/auth/login";
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
  const result = verifyToken(token, process.env.SECRET_KEY);
  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", message: "User Is Not Authorized" });
  }
 return res.status(200).json({ status: "success", data: result });
}
