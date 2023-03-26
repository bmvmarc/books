// import { Book } from "../entity/Book";
// import { AppDataSource } from "../data-source";

let books = [{}, {}];

const getBooks = async (req, reply) => {
  // const booksRepo = AppDataSource.getRepository(Book);
  // const [bookQ, quantity] = await booksRepo.findAndCount();

  // console.log(bookQ, quantity);

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

export { getBook, getBooks, addBook, deleteBook, updateBook };

// const user = new User()
// user.firstName = "Timber"
// user.lastName = "Saw"
// user.age = 25
// await AppDataSource.manager.save(user)
// console.log("Saved a new user with id: " + user.id)

// console.log("Loading users from the database...")
// const users = await AppDataSource.manager.find(User)
// console.log("Loaded users: ", users)

// const user = await myDataSource.manager.findOneBy(User, {
//     id: 1,
// })

// ___________________________________
// const authorRepository = AppDataSource.getRepository(Author);
// const author = new Author();
// author.name = "Fiodor Dostojewski";
// author.year = 1821;
// await authorRepository.save(author);

// const booksRepo = AppDataSource.getRepository(Book);
// const book1 = new Book();
// book1.title = "Crime and Punishment";
// book1.year = 1866;
// book1.author = author;

// await booksRepo.save(book1);

// const book2 = new Book();
// book2.title = "The idiot";
// book2.year = 1869;
// book2.author = author;

// await booksRepo.save(book2);

// const allAuthorsWithBooks = await authorRepository.findAndCount()

// console.log(allAuthorsWithBooks);

// const [bookQ, quantity] = await booksRepo.findAndCount();

// console.log(bookQ, quantity);
