import { useState } from "react";
import BaseStatusRadioButton from "../base/BaseStatusRadioButton";
import { postTodo } from "@/api/todo";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
const AddTodo = () => {
  const router = useRouter();
  const [todo, setTodo] = useState({
    title: "",
    status: "",
    description: "",
  });
  const textChangeHandler = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const addTodo = () => {
    postTodo(todo)
      .then(toast.success("Todo Added Successfully"))
      .then(router.push("/"));
  };
  return (
    <>
      <div className="w-full h-full py-4 px-4 lg:px-32 ">
        <h2 className="lg:text-5xl text-2xl font-bold"> Add New Todo </h2>
        <div className="flex items-start flex-col gap-16">
          <div>
            <label className="block lg:text-2xl font-semibold mt-8 ">
              Title :
            </label>
            <input
              onChange={textChangeHandler}
              value={todo.title}
              type="text"
              name={"title"}
              className="outline-none p-3 w-60 mt-4 rounded-lg transition-all duration-200 focus:shadow-lg border-slate-300 focus:border-indigo-400 border"
              placeholder="Enter Your Todo Title"
            />
          </div>
          <div>
            {" "}
            <label className="block lg:text-2xl font-semibold mt-8 ">
              Status :
            </label>
            <div className="w-full flex items-center justify-start md:flex-wrap md:flex-row flex-col gap-2 lg:gap-6">
              <BaseStatusRadioButton
                title={"To Do"}
                name={"todo"}
                value={"todo"}
                className={
                  "text-white bg-indigo-400 flex items-center justify-between gap-8 p-4 rounded-xl text-lg mt-6 w-48"
                }
                todo={todo}
                setTodo={setTodo}
              />
              <BaseStatusRadioButton
                title={"In Progress"}
                name={"inProgress"}
                value={"inProgress"}
                className={
                  "text-white bg-indigo-500 flex items-center justify-between gap-8 p-4 rounded-xl text-lg mt-6 w-48"
                }
                todo={todo}
                setTodo={setTodo}
              />
              <BaseStatusRadioButton
                title={"Review"}
                name={"review"}
                value={"review"}
                className={
                  "text-white bg-indigo-600 flex items-center justify-between gap-8 p-4 rounded-xl text-lg mt-6 w-48"
                }
                todo={todo}
                setTodo={setTodo}
              />
              <BaseStatusRadioButton
                title={"Done"}
                name={"status"}
                value={"done"}
                className={
                  "text-white bg-indigo-700 flex items-center justify-between gap-8 p-4 rounded-xl text-lg mt-6 w-48"
                }
                todo={todo}
                setTodo={setTodo}
              />
            </div>
          </div>
        </div>
        <button
          className="px-16 py-4 bg-indigo-500 rounded-xl sm:mx-auto text-xl text-white mt-32 "
          onClick={addTodo}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddTodo;
