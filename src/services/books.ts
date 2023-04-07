import { Book } from "../entity/Book.js";
import { AppDataSource } from "../data-source.js";
import { Repository } from "typeorm";
import { MyBodyObject } from "../controllers/books.js";
import { Author } from "../entity/Author.js";
class BooksService {
  private booksRepo: Repository<Book>;
  private authorsRepo: Repository<Author>;
  constructor() {
    this.booksRepo = AppDataSource.getRepository(Book);
    this.authorsRepo = AppDataSource.getRepository(Author);
  }
  getBooks = async () => {
    const books = await this.booksRepo.find();
    return books;
  };

  getBook = async (id: string) => {
    const books = await this.booksRepo.find();
    const book = books.find((i) => i.id.toString() === id);
    return book;
  };

  addBook = async (book: MyBodyObject) => {
    const { title, author, year } = book;

    let authorObj = await this.authorsRepo.findOneBy({
      name: author,
    });

    if (!authorObj) {
      authorObj = new Author();
      authorObj.name = author;
      await this.authorsRepo.save(authorObj);
    }

    try {
      const newBook = new Book();
      newBook.title = title;
      newBook.year = year;
      newBook.author = authorObj;

      const createdBook = await this.booksRepo.save(newBook);
      return createdBook;
    } catch (e) {
      console.log("\n\n " + e);
      return { error: "Error while creating the book" };
    }
  };

  updateBook = async (id: string, bookdata: MyBodyObject) => {
    const books = await this.booksRepo.find();
    const book = books.find((i) => i.id.toString() === id);
    const { title } = bookdata;
    console.log("\n\n book: " + JSON.stringify(book));

    if (book) {
      book.title = title;

      await this.booksRepo.save(book);
      return book;
    }
    return { error: "The book wasn't found" };
  };

  deleteBook = async (id: string) => {
    const books = await this.booksRepo.find();
    const book = books.find((i) => i.id.toString() === id);

    console.log("\n\n book: " + JSON.stringify(book));

    if (book) {
      await this.booksRepo.delete(book);
    }
  };
}

export default BooksService;
