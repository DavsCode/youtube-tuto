import React, { useEffect, useState } from "react";
import Books from "../components/Books";
import { getBooks } from "../services/services";
import Upsert from "../components/Upsert";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadAllBooks = async () => {
      try {
        const res = await getBooks();
        if (res.status == 200) {
          setBooks(res.data);
          setFilteredBooks(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadAllBooks();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;

    if (search) {
      setFilteredBooks(
        books.filter(
          (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.desc.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <div className="home">
      {open && <Upsert setOpen={setOpen} />}
      <div className="container">
        <div className="filters">
          <div className="filter-wrapper">
            <button onClick={() => setOpen(true)}>Add Book</button>
          </div>
          <div className="search-wrapper">
            <input onChange={handleSearch} type="text" placeholder="Search" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="booklist">
          <Books books={filteredBooks} />
        </div>
      </div>
    </div>
  );
}
