import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "./Header";
import Body from "./Body";
import axios from "axios";

export interface Todo {
  id?: string;
  name: string;
  completed: boolean;
}

export default function Layout() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  useEffect(() => {
    getAllTodo();
  }, []);

  function getAllTodo() {
    setLoading(true);
    axios
      .get("http://localhost:3000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  const createTodo = async (todo: Todo) => {
    setLoading(true);
    try {
      const res = await axios.post<Todo>("http://localhost:3000/todos", todo);
      setTodos((prev) => [...prev, res.data]);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } finally {
      setLoading(false);
    }
  };

  const update = async (input: string, id: string): Promise<void> => {
    setLoading(true);
    try {
      const updatedTodo = { name: input, complated: false };
      const res = await axios.put<Todo>(
        `http://localhost:3000/todos/${id}`,
        updatedTodo
      );

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleted = async (id: string): Promise<void> => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { name: todo.name, completed: !todo.completed };
    const res = await axios.put<Todo>(
      `http://localhost:3000/todos/${id}`,
      updatedTodo
    );
    setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  return (
    <div
      style={{
        padding: "24px",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
        width: "500px",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        margin: "100px 600px",
      }}
    >
      {loading && <div className="spinner"></div>}
      <Header todos={todos} createTodo={createTodo} setFilter={setFilter}></Header>
      <Body
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={update}
        toggleCompleted={toggleCompleted}
        filter={filter}
      ></Body>
    </div>
  );
}
