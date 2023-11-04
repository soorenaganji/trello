import { patchTodo, putTodo, deleteTodo } from "@/api/todo";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsArrowRight, BsArrowLeft, BsFillTrash3Fill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDone } from "react-icons/md";
const TodoCard = ({ todo, className, next, previous, fetchTodos }) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [titleOnEdit, setTitleOnEdit] = useState(todo?.title);

  const todoDeleteHandler = async () => {
    const res = await deleteTodo(todo?._id);
    if (res.status == 200) {
      toast.success("Todo Deleted Successfully");
    }
    if (res.status === 404) {
      toast.error("Todo Doesn't Exist");
    }
    fetchTodos();
  };
  const editTodo = async () => {
    const newData = { ...todo, title: titleOnEdit };
    const res = await putTodo(newData);
    if (res.status == 200) {
      toast.success("Todo Updated Successfully");
    }
    fetchTodos();
    setIsOnEdit(false);
  };
  const titleChangeHandler = (e) => {
    setTitleOnEdit(e.target.value);
  };
  const changeTodoStatus = async (status) => {
    const res = await patchTodo(todo?._id, status);
    if (res.data.status === "success") {
      fetchTodos();
    }
  };
  return (
    <>
      <div className="w-60 rounded-lg py-3 px-2 bg-white shadow-md ">
        <div className={" my-1 h-1  rounded-full " + className}></div>
        <div className="flex items-center justify-between mt-4 mb-8">
          {isOnEdit ? (
            <>
              <input
                type="text"
                placeholder="Enter todo"
                value={titleOnEdit}
                onChange={titleChangeHandler}
                className="p-2 border border-indigo-400 shadow-md text-sm w-fit rounded-md outline-none"
              />
              <button
                className="p-2 text-white w-8 bg-indigo-600 rounded-md"
                onClick={editTodo}
                type="submit"
              >
                {" "}
                <MdOutlineDone />{" "}
              </button>
            </>
          ) : (
            <>
              <h4 className=" text-sm ">{todo.title}</h4>
              <div>
                <button
                  onClick={todoDeleteHandler}
                  className=" transition-colors duration-300 hover:bg-red-100 p-2 rounded-md inline-block"
                >
                  <BsFillTrash3Fill />
                </button>
                <button
                  onClick={() => setIsOnEdit(true)}
                  className=" transition-colors duration-300 hover:bg-slate-100 p-2 rounded-md inline-block ml-1"
                >
                  {" "}
                  <LuEdit />{" "}
                </button>
              </div>
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          {previous ? (
            <button
              onClick={() => changeTodoStatus(previous)}
              className={`px-3 py-2 bg-yellow-100 outline-none rounded-lg text-sm flex  items-center justify-between gap-2 `}
            >
              <BsArrowLeft />
              Previous
            </button>
          ) : (
            ""
          )}
          {next ? (
            <button
              onClick={() => changeTodoStatus(next)}
              className={`px-3 py-2 bg-green-100 outline-none rounded-lg text-sm flex  items-center justify-between gap-2 `}
            >
              Next
              <BsArrowRight />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TodoCard;
