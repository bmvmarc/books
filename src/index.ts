import { AppDataSource } from './data-source.js';
import Fastify from 'fastify';
import BookRoutes from './routes/books.js';

AppDataSource.initialize()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .then(async () => {
    const fastify = Fastify({
      logger: true,
    });
    fastify.register(BookRoutes);
    console.log('fastify is started');
  })
  .catch((error) => console.log(error));
