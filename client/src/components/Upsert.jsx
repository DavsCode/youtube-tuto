import React, { useEffect, useState } from "react";
import Default from "../assets/images/default.jpg";
import {
  createBook,
  getCategories,
  updateBook,
  uploadCover,
} from "../services/services";
import { useNavigate } from "react-router-dom";

const IMAGES_URL = import.meta.env.VITE_API_IMAGES_URL;

export default function Upsert({ book, setOpen }) {
  const [inputs, setInputs] = useState({
    title: book ? book?.title : "",
    desc: book ? book?.desc : "",
    author: book ? book?.author : "",
    categoryId: book ? book?.categoryId : "",
    price: book ? book?.price : 0,
  });
  const [cover, setCover] = useState(
    book?.cover ? `${IMAGES_URL}/${book.cover}` : ""
  );

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        if (res.status == 200) {
          setCategories(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCategories();
  }, []);

  const handleSetInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSetCategory = (e) => {
    setInputs((prev) => ({ ...prev, categoryId: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // upload
    const filename = await handleUploadImage();

    try {
      if (book) {
        // update book
        const data = {
          ...inputs,
          id: book.id,
          cover: filename ? filename : book.cover,
        };

        const res = await updateBook(data);
        if (res.status == 200) {
          console.log(res);
          navigate(`/${res.data.slug}`);
          setOpen(false);
        }
      } else {
        // create book
        const data = {
          ...inputs,
          cover: filename ? filename : "",
        };

        const res = await createBook(data);
        if (res.status == 200) {
          navigate(`/${res.data.slug}`);
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleUploadImage = async () => {
    if (!image) return undefined;

    try {
      const formData = new FormData();
      formData.append("filename", image.filename);
      formData.append("file", image.file);

      const res = await uploadCover(formData);
      if (res.status == 200) {
        return image.filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e) => {
    if (e.target.files.length == 0) return;

    const file = e.target.files[0];
    const tmpImage = {
      filename: new Date().getTime() + "-" + file.name,
      file,
      url: URL.createObjectURL(file),
    };
    setImage(tmpImage);
  };

  console.log(inputs);

  return (
    <div className="upsert">
      <div className="upsert-wrapper">
        <div className="heading-wrapper">
          <h2>{book ? "Edit Book" : "Add Book"}</h2>
          <div onClick={() => setOpen(false)}>
            <i className="fa-solid fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="upsert-form">
          <div className="upsert-left">
            <div className="upsert-cover">
              <img src={image ? image.url : cover ? cover : Default} alt="" />
            </div>
            <label htmlFor="cover">
              <input
                style={{ display: "none" }}
                type="file"
                id="cover"
                accept=".jpg,.jpeg,.png"
                onChange={handleImage}
              />
              <i className="fa-solid fa-cloud-arrow-up btn">
                <span>Upload</span>
              </i>
            </label>
          </div>

          <form className="upsert-right" onSubmit={handleCreate}>
            <input
              onChange={handleSetInputs}
              required
              name="title"
              value={inputs?.title}
              type="text"
              placeholder="Title"
            />
            <input
              onChange={handleSetInputs}
              required
              name="author"
              value={inputs?.author}
              type="text"
              placeholder="Author"
            />
            <select onChange={handleSetCategory} value={inputs?.categoryId}>
              {categories.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.name}
                </option>
              ))}
            </select>
            <input
              onChange={handleSetInputs}
              required
              name="price"
              value={inputs?.price}
              type="number"
              placeholder="Price"
            />
            <textarea
              onChange={handleSetInputs}
              required
              name="desc"
              value={inputs?.desc}
              type="text"
              placeholder="Description"
            />
            <div className="actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {book ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
