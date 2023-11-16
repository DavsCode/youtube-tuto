const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const slugify = require("slugify");
const multer = require("multer");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// static files
app.use(express.static("assets"));
app.use("/images", express.static(__dirname + "assets/images"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage });

// routes
app.get("/", (req, res) => {
  res.send("Hello from bookStore...");
});

// get a single book
app.get("/books/:slug", async (req, res) => {
  try {
    const selectOptions = {
      id: true,
      title: true,
      slug: true,
      desc: true,
      author: true,
      cover: true,
      price: true,
      categoryId: true,
      category: { select: { id: true, name: true } },
      createdAt: true,
    };
    const book = await prisma.book.findFirst({
      where: { slug: req.params.slug },
      select: selectOptions,
    });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
});

// get all books
app.get("/books", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
});

// add a book
app.post("/books", async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
    };
    const book = await prisma.book.create({ data });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
});

// update a book
app.put("/books/:id", async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
    };
    const updated = await prisma.book.update({
      where: { id: req.params.id },
      data,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
  }
});

// delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    await prisma.book.delete({ where: { id: req.params.id } });
    res.status(200).json("Book has been deleted.");
  } catch (error) {
    console.log(error);
  }
});

// get all categories
// we can select fields we want to send to the client.
app.get("/categories/books", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
  }
});

// upload image
app.post("/images", upload.single("file"), (req, res) => {
  res.status(200).json("image uploaded");
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port: ", process.env.PORT);
});
