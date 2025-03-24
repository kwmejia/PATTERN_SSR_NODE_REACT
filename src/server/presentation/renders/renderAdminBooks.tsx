import React from "react";
import { renderToString } from "react-dom/server";
import { AppShell } from "@client/AppShell";
import { Book } from "@app/types/entities/Books";

export function renderAdminBooksView(books: Book[]) {
  const html = renderToString(
    <AppShell
      pageId="booksAdmin"
      props={{
        books,
      }}
    />
  );
  return "<!DOCTYPE html>" + html;
}
