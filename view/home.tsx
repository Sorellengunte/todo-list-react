import React, { useState, useEffect } from "react";
import Button from "../src/components/button"; 

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  });

  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  // Compteur 
  useEffect(() => {
    if (count > 10) return;
    document.title = `Compteur : ${count}`;
    const timer = setTimeout(() => setCount((c) => c + 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  // Sauvegarde  dans localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Ajouter ou modifier une tâche
  function handleSubmit() {
    if (!text.trim()) return;

    setTodos((prev) =>
      editId !== null
        ? prev.map((t) => (t.id === editId ? { ...t, text } : t))
        : [...prev, { id: Date.now(), text }]
    );

    setText("");
    setEditId(null);
  }

  // Supprimer une tâche
  function removeTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // la modification 
  function editTodo(todo: Todo) {
    setText(todo.text);
    setEditId(todo.id);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">React Todo List</h1>

        <div className="flex mb-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ajouter une tâche"
            className="flex-grow px-4 py-2 border rounded-l-lg"
          />

          <Button onClick={handleSubmit} variant={editId !== null ? "modifier" : "ajouter"}
          >
            {editId !== null ? "Modifier" : "Ajouter"}
          </Button>
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
                  <Button variant="modifier" onClick={() => editTodo(todo)}>
                    Modifier
                  </Button>

                  <Button variant="supprimer" onClick={() => removeTodo(todo.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
