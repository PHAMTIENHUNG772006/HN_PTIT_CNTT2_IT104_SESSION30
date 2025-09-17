import Swal from "sweetalert2";
import type { Todo } from "./Layout";
import { useState } from "react";

interface HeaderProps {
  todos: Todo[];
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (input: string, id: string) => Promise<void>;
  toggleCompleted : (id:string) => Promise<void>;
  filter: "all" | "completed" | "incomplete";
}
export default function Body({ todos, deleteTodo, updateTodo, toggleCompleted ,filter}: HeaderProps) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn chắc chắn muốn xoá?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận!",
    });

    if (result.isConfirmed) {
      deleteTodo(id);
      Swal.fire("Đã xoá!", "Sinh viên đã được xoá.", "success");
    }
  };

  const handleOpen = (id: string | null) => {
    setCurrentId(id);
    setIsUpdate(true);
    setInput("");
    setError("");
  };

  const handleUpdate = () => {
    if (!input) {
      setError("Input không được để trống");
      return;
    }

    const todoFound = todos.find((element) => element.name === input);

    if (todoFound) {
      setError("Đã có công việc");
      return;
    }
    if (currentId) {
      updateTodo(input, currentId);
      setIsUpdate(false);
      setCurrentId(null);
      setError("");
      setInput("");
    }
  };

const handleToggleCompleted = (id: string) => {
  toggleCompleted(id);
};


const filteredTodos = todos.filter(todo => {
  if (filter === "completed") return todo.completed;
  if (filter === "incomplete") return !todo.completed;
  return true;
});

  return (
    <div>
      <div
        style={{
          width: "100%",
          padding: "24px",
          maxHeight: todos.length > 5 ? "300px" : "auto",
          overflowY: todos.length > 5 ? "auto" : "visible",
        }}
      >
        {filteredTodos.map((element) => (
          <div
            key={element.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
              padding: "12px",
            }}
          >
            <input
              type="checkbox"
              checked={element.completed}
              onChange={() => handleToggleCompleted(element.id!)}
            />

            {element.completed ? (
              <s>
                <div style={{ width: "250px", fontSize: "20px" }}>
                  {element.name}
                </div>
              </s>
            ) : (
              <div style={{ width: "250px", fontSize: "20px" }}>
                {element.name}
              </div>
            )}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => handleOpen(element.id!)}
                style={{
                  backgroundColor: "#FFCE4B",
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "7px",
                  color: "#fff",
                }}
              >
                🖋️
              </button>
              <button
                onClick={() => handleDelete(String(element.id))}
                style={{
                  backgroundColor: "red",
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "7px",
                  color: "#fff",
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {isUpdate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Sửa công việc</h2>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập công việc mới"
            />
            <div>{error}</div>
            <div className="modal-buttons">
              <button onClick={() => setIsUpdate(false)}>Hủy</button>
              <button
                onClick={() => {
                  handleUpdate();
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
