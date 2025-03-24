import React from "react";
import { createRoot } from "react-dom/client";
import { LoginPage } from "@client/pages/LoginPage";
import { RegisterPage } from "@client/pages/RegisterPage";
import { AlertProvider } from "@client/context/AlertContext";
import { AdminBooksPage } from "@client/pages/AdminBooksPage";
import { UserDashboardPage } from "@client/pages/UserDashboardPage";
import "@client/assets/styles/index.css";

const PAGE_MAP: Record<string, React.FC<any>> = {
  login: LoginPage,
  register: RegisterPage,
  userDashboard: UserDashboardPage,
  booksAdmin: AdminBooksPage,
};

const pageId = (window as any).__SSR_PAGE__;
const props = (window as any).__INITIAL_PROPS__;

const Component = PAGE_MAP[pageId];
const rootElement = document.getElementById("client-root");

if (Component && rootElement) {
  createRoot(rootElement).render(
    <AlertProvider>
      <Component {...props} />
    </AlertProvider>
  );
}
