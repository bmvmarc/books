import BooksService from "../services/books.js";
import { FastifyReply, FastifyRequest } from "fastify";

type MyQueryObject = {
  query?: string;
};

export type MyBodyObject = {
  title: string;
  author: string;
  year: number;
};

type MyRequest = FastifyRequest<{
  Querystring: { queryObj: MyQueryObject };
  Params: { id: string };
  Body: MyBodyObject;
}>;

class BooksController {
  private repo: BooksService;
  constructor() {
    this.repo = new BooksService();
  }

  getBooks = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const books = await this.repo.getBooks();
      res.status(200).send(books);
    } catch (e) {
      console.log(e);
      res.status(404).send({ error: "Not Found" });
    }
  };

  getBook = async (req: MyRequest, res: FastifyReply) => {
    try {
      // const { queryObj } = req.query;
      const { id } = req.params;
      const book = await this.repo.getBook(id);
      if (book) {
        res.status(200).send(book);
      } else {
        res.status(404).send({ error: "Not Found: " + id });
      }
    } catch (e) {
      console.log(e);
      res.status(404).send({ error: "Not Found" });
    }
  };

  addBook = async (req: MyRequest, res: FastifyReply) => {
    const book = req.body;

    try {
      const result = await this.repo.addBook(book);

      if (Object.prototype.hasOwnProperty.call(result, "error")) {
        res.status(404).send(result);
      } else {
        res.status(201).send(result);
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: "Bad Request" });
    }
  };

  updateBook = async (req: MyRequest, res: FastifyReply) => {
    try {
      const { id } = req.params;
      const bookdata = req.body;
      const result = await this.repo.updateBook(id, bookdata);
      if (Object.prototype.hasOwnProperty.call(result, "error")) {
        res.status(404).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: "Bad Request" });
    }
  };

  deleteBook = async (req: MyRequest, res: FastifyReply) => {
    const { id } = req.params;
    try {
      await this.repo.deleteBook(id);
    } catch (e) {
      res.status(400).send({ error: "Bad Request" });
    }
    res.status(201).send({ message: "deleted" });
  };
}

export { BooksController };
