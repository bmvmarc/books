import Fastify from 'fastify';

const fastify = Fastify();

import { BooksController } from '../controllers/books.js';

const booksController = new BooksController();

// Book schema
const Book = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    author: { type: 'string' },
    year: { type: 'number' },
  },
};

// Options for get all books
const getBooksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        books: Book,
      },
    },
  },
  handler: booksController.getBooks,
};

// Options for get a book
const getBookOpts = {
  schema: {
    response: {
      200: Book,
    },
  },
  handler: booksController.getBook,
};
// Options for create a book
const postBookOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        year: { type: 'number' },
      },
      response: {
        201: Book,
      },
    },
    handler: booksController.addBook,
  },
};
// Options for delete a book
const deleteBookOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
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
      type: 'object',
      properties: {
        title: { type: 'string' },
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
  fastify.get('/books', getBooksOpts);
  // Get a single book
  fastify.get('/books/:id', getBookOpts);
  // Add an book
  fastify.post('/books', deleteBookOpts);
  // Delete an book
  fastify.delete('/books/:id', deleteBookOpts);
  // Update an book
  fastify.put('/books/:id', updateBookOpts);

  done();
}

export default BookRoutes;
