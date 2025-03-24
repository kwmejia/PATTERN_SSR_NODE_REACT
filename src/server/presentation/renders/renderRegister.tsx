import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell } from "@client/AppShell";

export function renderRegister() {
  const html = renderToString(<AppShell pageId="register" />);
  return "<!DOCTYPE html>" + html;
}
