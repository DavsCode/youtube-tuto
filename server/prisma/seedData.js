const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

// please find the seeddata file on the repo

const Categories = [
  { name: "Romance" },
  { name: "Science Fiction" },
  { name: "Horror" },
  { name: "Comedy" },
  { name: "Crime Story" },
  { name: "Thriller" },
  { name: "Classic" },
  { name: "Love Story" },
  { name: "Fantasy" },
  { name: "Fairy Tale" },
  { name: "Novel" },
  { name: "Children's Book" },
  { name: "Biography" },
  { name: "Poetry Books" },
];

const Books = [
  {
    title: "To Kill a Mockingbird",
    slug: "",
    desc: "A classic novel by Harper Lee set in the American South during the 1930s. It addresses issues of racism and injustice.",
    cover: "",
    author: "Harper Lee",
    price: 12.99,
  },
  {
    title: "1984",
    slug: "",
    desc: "George Orwell's dystopian masterpiece that explores the consequences of totalitarianism and surveillance.",
    cover: "",
    author: "George Orwell",
    price: 10.99,
  },
  {
    title: "Pride and Prejudice",
    slug: "",
    desc: "Jane Austen's romantic novel set in the early 19th century, focusing on love and class issues.",
    cover: "",
    author: "Jane Austen",
    price: 14.5,
  },
  {
    title: "The Catcher in the Rye",
    slug: "",
    desc: "J.D. Salinger's novel narrated by the troubled teenager Holden Caulfield, exploring themes of adolescence and alienation.",
    cover: "",
    author: "J.D. Salinger",
    price: 9.99,
  },
  {
    title: "The Great Gatsby",
    slug: "",
    desc: "F. Scott Fitzgerald's novel set in the Roaring Twenties, delving into themes of wealth, love, and the American Dream.",
    cover: "",
    author: "F. Scott Fitzgerald",
    price: 11.75,
  },
  {
    title: "The Hobbit",
    slug: "",
    desc: "J.R.R. Tolkien's fantasy novel that follows the adventures of Bilbo Baggins as he embarks on a quest.",
    cover: "",
    author: "J.R.R. Tolkien",
    price: 13.25,
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    slug: "",
    desc: "The first book in J.K. Rowling's popular series about a young wizard, Harry Potter.",
    cover: "",
    author: "J.K. Rowling",
    price: 15.99,
  },
  {
    title: "The Hunger Games",
    slug: "",
    desc: "Suzanne Collins' dystopian novel where teenagers are forced to participate in a brutal competition for survival.",
    cover: "",
    author: "Suzanne Collins",
    price: 12.5,
  },
  {
    title: "The Alchemist",
    slug: "",
    desc: "Paulo Coelho's philosophical novel about a shepherd's journey to find his personal legend.",
    cover: "",
    author: "Paulo Coelho",
    price: 9.99,
  },
  {
    title: "Moby-Dick",
    slug: "",
    desc: "Herman Melville's epic novel about the relentless pursuit of the white whale, Moby Dick.",
    cover: "",
    author: "Herman Melville",
    price: 11.99,
  },
];

async function seedDataAsync() {
  await prisma.category.deleteMany();
  await prisma.book.deleteMany();

  let tmpCategories = [];

  for (const category of Categories) {
    const cat = await prisma.category.create({ data: category });
    tmpCategories.push(cat);
  }

  for (const book of Books) {
    // get random category index
    const index = Math.floor(Math.random() * tmpCategories.length);
    await prisma.book.create({
      data: {
        ...book,
        slug: slugify(book.title, { lower: true, strict: true }),
        categoryId: tmpCategories[index].id,
      },
    });
  }
}

seedDataAsync();
