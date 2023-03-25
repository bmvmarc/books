import { AppDataSource } from "./data-source";
import { Book } from "./entity/Book";
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import BookRoutes from "./routes/books";

AppDataSource.initialize()
  .then(async () => {
    console.log(
      "As I understand, here we run the server bc DB is connected all right"
    );

    startServer();
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
  })
  .catch((error) => console.log(error));

const startServer = async () => {
  const fastify = Fastify({ logger: true });

  fastify.register(fastifySwagger, {});
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  fastify.register(BookRoutes);

  const PORT = 5000;

  const start = async () => {
    try {
      await fastify.listen({ port: PORT });
    } catch (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  };

  start();

  const booksRepo = AppDataSource.getRepository(Book);

  const [bookQ, quantity] = await booksRepo.findAndCount();

  console.log(bookQ, quantity);
};
