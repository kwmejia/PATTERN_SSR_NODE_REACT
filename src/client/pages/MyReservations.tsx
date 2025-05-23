import React from "react";
import { IReservation } from "@app/types/entities/Reservation";


interface IPropsMyReservations {
    reservations: IReservation[]
}

export const MyReservations = ({ reservations }: IPropsMyReservations) => {


  if (reservations.length === 0) {
    return <p className="text-gray-500">Aún no tienes libros reservados.</p>;
  }
  
  return (
    <ul className="space-y-4"> 
      {reservations.map((r) => (
        <li key={r.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <p className="font-semibold">{r.book.title}</p>
          <p className="text-sm text-gray-500">Autor: {r.book.author}</p>
          <p className="text-sm text-gray-500">
            Reservado: {new Date(r.reservedAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Expira: {new Date(r.expiresAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
};
