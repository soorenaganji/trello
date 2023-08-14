import axios from "axios";

export async function createUser (data) {
  const res = await  axios.post("/api/auth/signup" , data)
  console.log(data)
  return res.data
    
}
export async function loginUser (data) {
  return axios.post("/api/auth/login", data)
}