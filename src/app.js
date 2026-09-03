const path = require('path');
const express = require('express');
const { ROOT_DIR } = require('./config');
const { createDatabase, createProductRepository } = require('./db/database');
const { enableCors } = require('./middleware/cors');
const { createHealthRouter } = require('./routes/health.routes');
const { createProductsRouter } = require('./routes/products.routes');

const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_ERROR = 500;

function createApp(options = {}) {
  const dbPath = options.dbPath ?? process.env.DB_PATH ?? ':memory:';
  const db = createDatabase(dbPath);
  const repository = createProductRepository(db);

  const app = express();

  app.use(express.json());
  app.use(enableCors);
  app.use('/api', createHealthRouter());
  app.use('/api', createProductsRouter(repository));
  app.use(express.static(path.join(ROOT_DIR, 'src', 'public')));

  app.use((error, request, response, next) => {
    if (error.type === 'entity.parse.failed') {
      response.status(HTTP_BAD_REQUEST).json({ error: 'Cuerpo de la peticion invalido' });
      return;
    }
    response.status(HTTP_INTERNAL_ERROR).json({ error: 'Error interno del servidor' });
  });

  app.closeDatabase = () => db.close();

  return app;
}

module.exports = { createApp };
