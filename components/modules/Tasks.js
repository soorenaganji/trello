import TodoCard from "./TodoCard";
const Tasks = ({ data, name, fetchTodos, next, previous, card, color }) => {
  return (
    <div className="w-64 h-[70vh]  overflow-hidden rounded-xl bg-slate-100">
      <h3 className={"w-full py-2 text-center text-xl font-medium " + color}>
        {name}
      </h3>
      <div className="flex items-center justify-start basis-1/3 flex-1  pt-2 pb-16 overflow-scroll h-full flex-col  gap-6">
        {data?.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo._id}
            className={`${color}  ${card}`}
            next={next}
            previous={previous}
            fetchTodos={fetchTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
