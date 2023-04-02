import { AppDataSource } from './data-source.js';
import Fastify from 'fastify';
import BookRoutes from './routes/books.js';
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

AppDataSource.initialize()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .then(async () => {
    const fastify = Fastify({
      logger: true,
    });
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
  })
  .catch((error) => console.log(error));
