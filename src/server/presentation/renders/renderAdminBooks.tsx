import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell } from "@client/AppShell";
import { Book } from "@app/types/entities/Books";
import { JwtPayload } from "@app/types/JwtPayload";

export function renderAdminBooksView(books: Book[], user: JwtPayload) {
  const html = renderToString(
    <AppShell
      pageId="booksAdmin"
      props={{
        books,
        user
      }}
    />
  );
  return "<!DOCTYPE html>" + html;
}
