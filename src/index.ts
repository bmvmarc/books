import { AppDataSource } from "../src/data-source.js";
import { User } from "./entity/User.js";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express / fastify ");
  })
  .catch((error) => console.log(error));

// export default AppDataSource;
// import { Book } from "./entity/Book";
// import Fastify from "fastify";
// import fastifySwagger from "@fastify/swagger";
// import fastifySwaggerUi from "@fastify/swagger-ui";
// import BookRoutes from "./routes/books";

// AppDataSource.initialize()
//   .then(async () => {
//     startServer();
//   })
//   .catch((error) => console.log(error));

// const startServer = async () => {
//   const fastify = Fastify({ logger: true });

//   fastify.register(fastifySwagger, {});
//   fastify.register(fastifySwaggerUi, {
//     routePrefix: "/docs",
//     uiConfig: {
//       docExpansion: "full",
//       deepLinking: false,
//     },
//   });

//   fastify.register(BookRoutes);

//   const PORT = 5000;

//   const start = async () => {
//     try {
//       await fastify.listen({ port: PORT });
//     } catch (error) {
//       fastify.log.error(error);
//       process.exit(1);
//     }
//   };

//   start();

//   const booksRepo = AppDataSource.getRepository(Book);

//   const [bookQ, quantity] = await booksRepo.findAndCount();

//   console.log(bookQ, quantity);
// };
