import { useAlert } from "@client/context/AlertContext";
import { Book } from "@domain/models/Book";
import React, { useEffect, useState } from "react";

interface IPropsModalBooks {
  userId: string;
  onCloseModal: () => void;
  callReservations: () => void;
}

export const ModalBooks = ({
  onCloseModal,
  callReservations,
  userId,
}: IPropsModalBooks) => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");
  const alert = useAlert();
  useEffect(() => {
    onMounted();
  }, []);

  const onMounted = async () => {
    const data = await fetch("/books");
    const resp = await data.json();
    setBooks(resp);
  };

  const handleReserve = async () => {
    if (!selectedBookId) return;

    try {
      const resp = await fetch("/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          bookId: selectedBookId,
        }),
      });

      if (resp.ok) {
        callReservations();
        onCloseModal();
      } else {
        const { message } = await resp.json();
        alert.notify(
          "error",
          message || "Ocurrió un error al hacer la reserva"
        );
      }
    } catch (error: any) {
      console.log(error);
      alert.notify(
        "error",
        error.message || "Ocurrió un error al hacer la reserva"
      );
      setError(error.message || "Ocurrió un error al hacer la reserva");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Reservar libro
        </h3>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Selecciona un libro</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} — {book.author}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCloseModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleReserve}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!selectedBookId}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};
