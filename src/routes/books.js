import {
  getBook,
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../controllers/books";

// Book schema
const Book = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    author: { type: "string" },
    year: { type: "number" },
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
    },
  },
  handler: getBooks,
};

// Options for get a book
const getBookOpts = {
  schema: {
    response: {
      200: Book,
    },
  },
  handler: getBook,
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
    },
  },
  handler: addBook,
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
  handler: deleteBook,
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
  handler: updateBook,
};

function BookRoutes(fastify, options, done) {
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

module.exports = BookRoutes;
