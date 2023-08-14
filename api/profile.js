import axios from "axios";

export async function getUser() {
  const res = await axios.get("/api/profile");
  return res;
}
export async function updateUser(data) {
  const res = await axios.patch("/api/profile", { data });
  return res;
}
