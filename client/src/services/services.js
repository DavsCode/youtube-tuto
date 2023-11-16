import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const request = axios.create({ baseURL });

export const getBooks = () => request.get(`/books`);
export const getBook = (slug) => request.get(`/books/${slug}`);
export const createBook = (book) => request.post(`/books`, book);
export const updateBook = (book) => request.put(`/books/${book.id}`, book);
export const deleteBook = (id) => request.delete(`/books/${id}`);
export const getCategories = () => request.get(`/categories/books`);
export const uploadCover = (cover) => request.post(`/images`, cover);
