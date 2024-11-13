import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
  };
  const deleteTodo = (id) => {
    console.log(id)
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => 
        todo.id !== id
      )
    );
  };
  const updateTodo = (id, newtodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => 
        todo.id === id ? newtodo : todo
      )
    );
  };
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todo"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="bg-slate-400 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-3 text-white bg-slate-500 py-3">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todos={todo} />
                </div>
              ))
            ) : (
              <p>No todos available</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
