import React, { useEffect, useState } from "react";
import Default from "../assets/images/default.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBook } from "../services/services";
import Upsert from "../components/Upsert";

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function Details() {
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBook = async () => {
      try {
        const res = await getBook(slug);
        if (res.status == 200) {
          setBook(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    slug && loadBook();
  }, [slug]);

  const handleDelete = async () => {
    if (book == null) return;
    try {
      const res = await deleteBook(book.id);
      if (res.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="details">
      {open && <Upsert setOpen={setOpen} book={book} />}
      <div className="container details-wrapper">
        <div className="details-left">
          <div className="cover">
            <img
              src={book?.cover ? `${IMAGES_URL}/${book.cover}` : Default}
              alt=""
              className="cover-picture"
            />
          </div>
        </div>
        <div className="details-right">
          <div className="title-wrapper">
            <i
              onClick={() => navigate("/")}
              className="fa-solid fa-arrow-left-long"
            ></i>
            <h2 className="title">{book?.title}</h2>
          </div>

          <div className="book-infos">
            <div className="author">
              <span>{book?.author}</span>
              <span>{book?.category?.name}</span>
              <span>{new Date(book?.createdAt).toDateString()}</span>
            </div>
            <div className="actions">
              <span
                onClick={() => setOpen(true)}
                className="fa-solid fa-edit edit-btn"
              ></span>
              <span
                onClick={handleDelete}
                className="fa-solid fa-trash delete-btn"
              ></span>
            </div>
          </div>

          <p className="body">{book?.desc}</p>
          <h1 className="price">${book?.price}</h1>

          <div className="quantity">
            <span className="sub">-</span>
            <span className="value">1</span>
            <span className="add">+</span>
          </div>

          <button>Add Cart</button>
        </div>
      </div>
    </div>
  );
}
