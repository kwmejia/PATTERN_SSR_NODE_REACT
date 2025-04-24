import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell } from "@client/AppShell";
import { JwtPayload } from "@app/types/JwtPayload";
import { Reservation } from "@domain/models/Reservation";

export function renderAdminReservationsView(reservations: Reservation[], user: JwtPayload) {
  const html = renderToString(
    <AppShell
      pageId="reservationsAdmin"
      props={{
        reservations,
        user
      }}
    />
  );
  return "<!DOCTYPE html>" + html;
}
