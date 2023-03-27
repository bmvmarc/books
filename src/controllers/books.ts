import { BooksService } from '../services/books.js';
import { Book } from '../entity/Book.js';
import { FastifyReply, FastifyRequest } from 'fastify';

class BooksController {
  private repo: BooksService;
  constructor() {
    const repo = new BooksService();
  }

  async getBooks(req: FastifyRequest, res: FastifyReply) {
    try {
      const books = await this.repo.getBooks();
      res.send(200);
    } catch {
      res.status(404).send({ error: 'Not Found' });
    }
  }

  async getBook(req: FastifyRequest, res: FastifyReply) {
    try {
      const book = await this.repo.getBook(req.id);
      res.status(200).send(book);
    } catch {
      res.status(404).send({ error: 'Not Found' });
    }
  }

  async addBook(req: FastifyRequest, res: FastifyReply) {
    const book = req.body as unknown;
    try {
      await this.repo.addBook(book as Book);
    } catch {
      res.status(400).send({ error: 'Bad Request' });
    }
    res.status(201).send({ status: 'Created' });
  }

  async updateBook(req: FastifyRequest, res: FastifyReply) {
    try {
      const bookdata = req.body as unknown;
      await this.repo.updateBook(bookdata as Partial<Book>);
    } catch {
      res.status(400).send({ error: 'Bad Request' });
    }
    res.status(200);
  }

  async deleteBook(req: FastifyRequest, res: FastifyReply) {
    const id = req.id;
    try {
      await this.repo.deleteBook(id);
    } catch (err: any) {
      res.status(400).send({ error: 'Bad Request' });
    }
    res.status(201).send({});
  }
}

export { BooksController };
