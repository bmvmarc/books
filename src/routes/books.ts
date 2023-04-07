import { BooksController } from "../controllers/books.js";

const booksController = new BooksController();

// Author schema
const Author = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    year: { type: "number" },
  },
};
// Book schema
const Book = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    author: Author,
    year: { type: "number" },
  },
};
// Error schema
const Error = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};
// Options for get all books
const getBooksOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        books: Book,
      },
      404: Error,
    },
  },
  handler: booksController.getBooks,
};

// Options for get a book
const getBookOpts = {
  schema: {
    response: {
      200: Book,
      404: Error,
    },
  },
  handler: booksController.getBook,
};
// Options for create a book
const postBookOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
        author: { type: "string" },
        year: { type: "number" },
      },
    },
    response: {
      201: Book,
      404: Error,
    },
  },
  handler: booksController.addBook,
};
// Options for delete a book
const deleteBookOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: booksController.deleteBook,
};
// Options for channge a book
const updateBookOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
      },
    },
    response: {
      200: Book,
    },
  },
  handler: booksController.updateBook,
};

function BookRoutes(fastify: any, options: any, done: any) {
  // Get all books
  fastify.get("/books", getBooksOpts);
  // Get a single book
  fastify.get("/books/:id", getBookOpts);
  // Add an book
  fastify.post("/books", postBookOpts);
  // Delete an book
  fastify.delete("/books/:id", deleteBookOpts);
  // Update an book
  fastify.put("/books/:id", updateBookOpts);

  done();
}

export default BookRoutes;
