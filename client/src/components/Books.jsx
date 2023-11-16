import React from "react";
import Book from "./Book";

export default function Books({ books }) {
  return (
    <div className="books-list">
      {books.map((book) => (
        <Book key={book?.id} book={book} />
      ))}
    </div>
  );
}
