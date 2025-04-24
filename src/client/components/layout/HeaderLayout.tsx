import { handleLogout } from "@client/utils/logout";
import { ROUTES } from "@client/utils/router";
import React from "react";

interface IPropsHeaderAdminPanel {
  userName: string;
  userEmail: string;
  children?: React.JSX.Element | React.JSX.Element[];
  role: string;
}

export const HeaderLayout = ({
  userName,
  userEmail,
  children,
  role,
}: IPropsHeaderAdminPanel) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            ¡Hola, {userName}!
          </h1>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
        {strategyNavBar(role)}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </header>
      {children}
    </div>
  );
};

const strategyNavBar = (role: string) =>
  role === "admin" ? <NavbarAdmin /> : <NavbarUser />;

const NavbarAdmin = () => (
  <nav className="flex gap-5">
    <a href={ROUTES.ADMIN_BOOKS_PAGE}>Administrar libros</a>
    <a href="/reservations/admin">Administrar Reservas</a>
  </nav>
);

const NavbarUser = () => (
  <nav>
    <a href="/users/dashboard">Mis reservas</a>
  </nav>
);
