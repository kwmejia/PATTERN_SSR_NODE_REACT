// src/presentation/pages/AdminBooksPage.tsx

import React, { useState } from "react";
import { useAlert } from "@client/context/AlertContext";
import { CreateBookModal } from "@client/components/admin-panel/CreateBookModal";
import { Book } from "@app/types/entities/Books";
import { handleLogout } from "@client/utils/logout";
import { HeaderLayout } from "@client/components/layout/HeaderLayout";
import { TableBooks } from "@client/components/admin-panel/TableBooks";

interface IProps {
  books: Book[];
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const AdminBooksPage: React.FC<IProps> = ({
  books: initialBooks,
  user,
}) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    quantity: 1,
    publishedAt: "",
  });

  const alert = useAlert();

  const cloneBook = async (book: Book) => {
    const newBook = {
      ...book,
      title: book.title + " - Copy",
      publishedAt: new Date(),
    };

    const res = await fetch(`/books/clone/${book.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    if (res.ok) {
      setBooks([
        ...books,
        { ...newBook, publishedAt: newBook.publishedAt.toISOString() },
      ]);
      alert.notify("success", "Libros clonados exitosamente");
    } else {
      alert.notify("error", "Error al clonar libros");
    }
  };

  const createBook = async () => {
    if (!form.publishedAt) {
      alert.notify("error", "La fecha de publicación es obligatoria");
      return;
    }

    const res = await fetch("/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newBook = await res.json();
      setBooks([...books, newBook]);
      setShowModal(false);
      setForm({ title: "", author: "", quantity: 1, publishedAt: "" });
      alert.notify("success", "Libro creado exitosamente");
    } else {
      alert.notify("error", "Error al crear el libro");
    }
  };

  return (
    <HeaderLayout userEmail={user.email} userName={user.name} role={"admin"}>
      <div className="max-w-5xl mx-auto mt-6">
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

        <TableBooks books={books} cloneBook={cloneBook} />
      </div>

      {showModal ? (
        <CreateBookModal
          form={form}
          setForm={setForm}
          onClose={() => setShowModal(false)}
          onCreate={createBook}
        />
      ) : (
        <></>
      )}
    </HeaderLayout>
  );
};
