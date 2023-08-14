import { getTodos } from "@/api/todo";
import { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";
const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = () => {
    getTodos().then((res) => {
      setTodos(res.data.data);
    });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <section className="w-full pt-8  flex items-center justify-between flex-col md:flex-wrap gap-8 md:flex-row lg:flex-nowrap px-8">
        <Tasks
          name={"Todo"}
          data={todos?.todo}
          next={"inProgress"}
          color={"bg-yellow-300"}
          card={"w-[40%]"}
          fetchTodos={fetchTodos}
        />
        <Tasks
          name={"In Progress"}
          data={todos?.inProgress}
          next={"review"}
          previous={"todo"}
          color={"bg-green-300"}
          card={"w-[60%]"}
          fetchTodos={fetchTodos}
        />
        <Tasks
          name={"Review"}
          data={todos?.review}
          next={"done"}
          previous={"inProgress"}
          color={"bg-blue-300"}
          card={"w-[80%]"}
          fetchTodos={fetchTodos}
        />
        <Tasks
          name={"Done"}
          data={todos?.done}
          previous={"review"}
          color={"bg-indigo-300"}
          card={"w-[100%]"}
          fetchTodos={fetchTodos}
        />
      </section>
    </>
  );
};

export default HomePage;
