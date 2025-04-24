import { HeaderLayout } from "@client/components/layout/HeaderLayout";
import { Reservation } from "@domain/models/Reservation";
import React from "react";

interface IProps {
  reservations: Reservation[];
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const AdminReservationsPage = ({ reservations, user }: IProps) => {
  return (
    <HeaderLayout userEmail={user.email} userName={user.name} role={"admin"}>
      <div className="max-w-5xl mx-auto mt-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Administración de reservas
        </h1>
      </div>
      <table className="m-auto max-w-5xl bg-white shadow-md rounded-lg overflow-hidden ">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Fecha de reservación</th>
            <th className="p-3 text-left">Fecha de expiración</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-t">
              <td className="p-3">{reservation.user.name}</td>
              <td className="p-3">{reservation.user.email}</td>
              <td className="p-3">
                {(reservation.reservedAt as string).split("T")[0]}
              </td>
              <td className="p-3">
                {(reservation.expiresAt as string).split("T")[0]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </HeaderLayout>
  );
};
