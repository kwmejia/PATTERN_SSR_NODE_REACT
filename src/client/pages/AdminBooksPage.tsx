import { AlertProvider, useAlert } from "@client/context/AlertContext";
import { Book } from "@domain/models/Book";
import React, { useEffect, useState } from "react";

export const AdminBooksPage: React.FC<{ books: Book[] }> = ({
  books: initialBooks,
}) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", quantity: 1 });

  const alert = useAlert();
  const cloneByAuthor = async (author: string) => {
    const res = await fetch(
      `/books/clone?author=${encodeURIComponent(author)}`,
      { method: "POST" }
    );
    if (res.ok) {
      const newBooks = await res.json();
      setBooks([...books, ...newBooks]);
      alert.notify("success", "Libros clonados exitosamente");
    } else {
      alert.notify("error", "Error al clonar libros");
    }
  };

  const createBook = async () => {
    const res = await fetch("/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newBook = await res.json();
      setBooks([...books, newBook]);
      setShowModal(false);
      setForm({ title: "", author: "", quantity: 1 });
      alert.notify("success", "Libro creado exitosamente");
    } else {
      alert.notify("error", "Error al crear el libro");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Administración de libros
        </h1>

        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Crear nuevo libro
          </button>
        </div>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Autor</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.quantity}</td>
                <td className="p-3">
                  <button
                    onClick={() => cloneByAuthor(book.author)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                  >
                    Clonar por autor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de creación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Crear nuevo libro</h2>

            <label className="block mb-2 text-sm">Título:</label>
            <input
              type="text"
              className="w-full border p-2 mb-4 rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <label className="block mb-2 text-sm">Autor:</label>
            <input
              type="text"
              className="w-full border p-2 mb-4 rounded"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />

            <label className="block mb-2 text-sm">Cantidad:</label>
            <input
              type="number"
              className="w-full border p-2 mb-4 rounded"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: parseInt(e.target.value) })
              }
              min={1}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={createBook}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
