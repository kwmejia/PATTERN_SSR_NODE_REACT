import { ROUTES } from "@client/utils/router";

export const handleLogout = async () => {
  await fetch("/auth/logout", { method: "POST" });
  window.location.href = ROUTES.LOGIN;
};
