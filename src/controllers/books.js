import { Author } from "./entity/Author";
import { User } from "./entity/User";

let books = [{}, {}];

const getBooks = (req, reply) => {
  reply.send(books);
};

const getBook = (req, reply) => {
  const { id } = req.params;
  const book = books.find((i) => i.id === id);
  reply.send(book);
};

const addBook = (req, reply) => {
  const { name } = req.body;
  const book = {
    name,
  };
  books = [...books, book];
  reply.code(201).send(book);
};

const deleteBook = (req, reply) => {
  const { id } = req.params;
  books = books.filter((i) => i.id !== id);
  reply.send({ message: `Book ${id} has been removed` });
};

const updateBook = (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;
  const newBook = { id, name };
  books = [...books.filter((i) => i.id !== id), newBook];

  reply.send(newBook);
};

module.exports = {
  getBook,
  getBooks,
  addBook,
  deleteBook,
  updateBook,
};
