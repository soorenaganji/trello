const BaseStatusRadioButton = ({
  title,
  className,
  name,
  value,
  setTodo,
  todo,
}) => {
  const statusChangeHandler = (e) => {
    setTodo({ ...todo, status: e.target.value });
    console.log(todo.status);
  };
  return (
    <div className={className}>
      <p>{title}</p>
      <input
        type="radio"
        checked={todo.status === value}
        name={name}
        value={value}
        onChange={statusChangeHandler}
      />
    </div>
  );
};

export default BaseStatusRadioButton;
