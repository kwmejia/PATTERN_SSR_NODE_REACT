import { Book } from "@app/types/entities/Books";
import React from "react";

export interface IPropsTableBooks {
  books: Book[];
  cloneBook: (book: Book) => Promise<void>;
}

export const TableBooks = ({ books, cloneBook }: IPropsTableBooks) => {
  return (
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
                onClick={() => cloneBook(book)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
              >
                Clonar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
