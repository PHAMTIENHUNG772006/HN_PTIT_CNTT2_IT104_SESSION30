import React, { useState } from "react";
import type { Todo } from "./Layout";

interface HeaderProps {
  todos: Todo[];
  createTodo: (todo: Todo) => Promise<void>;
   setFilter: React.Dispatch<React.SetStateAction<"all" | "completed" | "incomplete">>;
}

export default function Header({ todos, createTodo , setFilter}: HeaderProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      setError("Input không được để trống");
      return;
    }

    const todoFound = todos.find((element) => element.name === input);

    if (todoFound) {
      setError("Đã có công việc");
      return;
    }

    const newTodo: Todo = {
      name: input,
      completed: false,
    };
    createTodo(newTodo);
    setInput("");
    setError("");
  };

  return (
    <div className="w-[100%] text-center ">
      <header>
        <h1 style={{ textAlign: "center" }}>Quản lí công việc</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        action=""
        className=" gap-1 flex-col gap-[20px] form"
        style={{
          width: "",
          justifyContent: "center",
          padding: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "",
            justifyContent: "center",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          <input
            value={input}
            onChange={handleChange}
            style={{ width: "400px", padding: "12px", borderRadius: "8px" }}
            type="text"
            placeholder="Nhập tên công việc"
          />
          <div style={{ color: "red" }}>{error}</div>
          <button
            type="submit"
            style={{
              width: "200px",
              color: "#fff",
              backgroundColor: "#2563EB",
              padding: "12px",
              borderRadius: "8px",
            }}
            className="input"
          >
            Thêm công việc
          </button>
        </div>
      </form>
      <div
        className="block-status"
        style={{
          justifyContent: "center",
          display: "flex",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "16px",
            justifyContent: "center",
          }}
        >
          <button onClick={() => setFilter("all")}>Tất cả</button>
          <button onClick={() => setFilter("completed")}>Đã hoàn thành</button>
          <button onClick={() => setFilter("incomplete")}>
            Chưa hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
}
