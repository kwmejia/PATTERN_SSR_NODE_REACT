import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell } from "@client/AppShell";
import { JwtPayload } from "@app/types/JwtPayload";

export function renderUserDashboard(user: JwtPayload) {
  const html = renderToString(<AppShell pageId="userDashboard" props={{
    user
  }} />);
  return "<!DOCTYPE html>" + html;
}
