// src/presentation/components/CreateBookModal.tsx

import React from "react";

interface Props {
  form: {
    title: string;
    author: string;
    quantity: number;
    publishedAt: string;
  };
  setForm: React.Dispatch<React.SetStateAction<Props["form"]>>;
  onClose: () => void;
  onCreate: () => void;
}

export const CreateBookModal: React.FC<Props> = ({
  form,
  setForm,
  onClose,
  onCreate,
}) => {
  return (
    <div className="fixed inset-0  bg-white/60 bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-lg font-semibold mb-4">Crear nuevo libro</h2>

        <label className="block mb-2 text-sm">Título:</label>
        <input
          type="text"
          className="w-full border p-2 mb-4 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <label className="block mb-2 text-sm">Autor:</label>
        <input
          type="text"
          className="w-full border p-2 mb-4 rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
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
          required
        />

        <label className="block mb-2 text-sm">Fecha de publicación:</label>
        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          value={form.publishedAt}
          onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          required
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};
