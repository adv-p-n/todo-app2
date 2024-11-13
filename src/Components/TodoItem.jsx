import React, { useState } from "react";
import useTodo from "../contexts/TodoContext";

function TodoItem({ todos }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todos.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todos.id, { ...todos, todo: todoMsg });
    setIsEditable(false);
  };
  const setComplete = () => {
    toggleComplete(todos.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todos.completed ? "bg-[#c6e9a7]" : "bg-rose-300"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todos.completed}
        onChange={setComplete}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg px-1  ${
          isEditable ? "border-black/10 px-2" : "bg-transparent"
        }`}
        value={todoMsg}
        readOnly={!isEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />
      <button
        className="inline-flex w-10 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-200 hover:bg-gray-400 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todos.completed) return;
          if (isEditable) {
            editTodo();
          } else {
            setIsEditable((prev) => !prev);
          }
        }}
      >
        {isEditable ? "Save" : "Edit"}
      </button>
      <button className="inline-flex w-12 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-200 hover:bg-gray-400 shrink-0 disabled:opacity-50" onClick={()=>deleteTodo(todos.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
