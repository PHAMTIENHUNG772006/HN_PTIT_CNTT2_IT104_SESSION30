import React from 'react'


interface FooterProps {
  deleteCompletedTodos: () => Promise<void>;
  deleteAllTodos: () => Promise<void>;
}
export default function Footer({ deleteCompletedTodos, deleteAllTodos }: FooterProps) {
  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "24px" }}>
      <button
        onClick={deleteCompletedTodos}
        style={{
          padding: "12px",
          borderRadius: "7px",
          border: "none",
          backgroundColor: "red",
          color: "#fff",
        }}
      >
        Xoá công việc hoàn thành
      </button>
      <button
        onClick={deleteAllTodos}
        style={{
          marginLeft: "22px",
          padding: "12px",
          borderRadius: "7px",
          border: "none",
          backgroundColor: "red",
          color: "#fff",
        }}
      >
        Xoá tất cả công việc
      </button>
    </div>
  );
}
