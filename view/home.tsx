import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
};

export default function Home() {

  // local storage
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });
  
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  // compteur
  useEffect(() => {
    if (count > 10) return;

    document.title = `Compteur : ${count}`;

    const timer = setTimeout(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  // sauvegarde auto
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

// ajouter
  function handleSubmit() {
    if (!text.trim()) return;

    setTodos((prev) =>
      editId !== null ? prev.map((t) => (t.id === editId ? { ...t, text } : t)) : [...prev, { id: Date.now(), text }]
    );

    setText("");
    setEditId(null);
  }

  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(todo: Todo) {
    setText(todo.text);
    setEditId(todo.id);
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          React Todo List
        </h1>

        <div className="flex mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ajouter une tâche"
            className="flex-grow px-4 py-2 border rounded-l-lg"
          />

          <button
            onClick={handleSubmit}
            className={`px-6 py-2 text-black rounded-r-lg ${
              editId !== null
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {editId !== null ? "Modifier" : "Ajouter"}
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Tâche</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="border-b">
                <td className="p-3">{todo.text}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => editTodo(todo)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
