import React from "react";
import { Link } from "react-router-dom";
import Default from "../assets/images/default.jpg";

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function Book({ book }) {
  return (
    <div className="book-item">
      <Link to={`/${book?.slug}`}>
        <img
          src={book?.cover ? `${IMAGES_URL}/${book.cover}` : Default}
          alt=""
          className="cover-picture"
        />
      </Link>
      <div className="book-details">
        <Link to={`/${book?.slug}`}>
          <h2 className="title">{book?.title}</h2>
        </Link>
        <h4 className="price">${book?.price}</h4>
        <button className="cart-btn">Add Cart</button>
      </div>
    </div>
  );
}
