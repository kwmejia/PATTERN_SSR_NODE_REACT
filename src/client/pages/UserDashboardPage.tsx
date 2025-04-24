import { ModalBooks } from "@client/components/ModalBooks";
import React, { useEffect, useState } from "react";
import { MyReservations } from "./MyReservations";
import { IReservation } from "@app/types/entities/Reservation";
import { handleLogout } from "@client/utils/logout";
import { HeaderLayout } from "@client/components/layout/HeaderLayout";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const UserDashboardPage: React.FC<Props> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const [reservations, setReservations] = useState<IReservation[]>([]);

  useEffect(() => {
    onMounted();
  }, []);

  const onMounted = async () => {
    const data = await fetch("/reservations/me");
    const resp = await data.json();

    setReservations(resp);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <HeaderLayout userEmail={user.email} userName={user.name} role={"user"}>
      <main className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Tus libros reservados
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reservar libro
          </button>
        </div>
        <MyReservations reservations={reservations} />
      </main>

      {/* Modal */}
      {showModal ? (
        <ModalBooks
          userId={user.id}
          onCloseModal={handleCloseModal}
          callReservations={onMounted}
        />
      ) : (
        <></>
      )}
    </HeaderLayout>
  );
};
