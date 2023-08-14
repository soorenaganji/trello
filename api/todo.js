import axios from "axios";

export async function deleteTodo(_id) {
  const res = await axios.delete(`/api/todos/${_id}`);
  console.log(res);
  return res;
}

export async function putTodo(newData) {
  const { _id, title } = newData;
  const res = await axios.put("/api/todos", { _id, title });

  return res;
}

export async function patchTodo(id, status) {
  const res = await axios.patch("/api/todos", { id, status });

  return res;
}

export async function postTodo(todo) {
  const res = await axios.post("/api/todos", todo);

  return res;
}
export async function getTodos() {
  const res = await axios.get("/api/todos");
  return res;
}
