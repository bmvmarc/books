import { Book } from '../entity/Book.js';
import { AppDataSource } from '../data-source.js';
import { Repository } from 'typeorm';

// const booksRepo = AppDataSource.getRepository(Book);

class BooksService {
  private booksRepo: Repository<Book>;
  constructor() {
    this.booksRepo = AppDataSource.getRepository(Book);
  }
  getBooks = async () => {
    const books = await this.booksRepo.find();
    return books;
  };

  getBook = async (year: number) => {
    const book = await this.booksRepo.findOneBy({
      year: year,
    });
    return book;
  };

  // addBook(req: FastifyRequest, res: FastifyReply) {
  //   const book = req.body as unknown;
  //   try {
  //     await this.repo.addBook(book as Book);
  //   } catch {
  //     res.status(400).send({ error: 'Bad Request' });
  //   }
  //   res.status(201).send({ status: 'Created' });
  // }

  // updateBook(req: FastifyRequest, res: FastifyReply) {
  //   try {
  //     const bookdata = req.body as unknown;
  //     await this.repo.updateBook(bookdata as Partial<Book>);
  //   } catch {
  //     res.status(400).send({ error: 'Bad Request' });
  //   }
  //   res.status(200);
  // }

  // deleteBook(req: FastifyRequest, res: FastifyReply) {
  //   const id = req.id;
  //   try {
  //     await this.repo.deleteBook(id);
  //   } catch (err: any) {
  //     res.status(400).send({ error: 'Bad Request' });
  //   }
  //   res.status(201).send({});
  // }
}

export default BooksService;
