const path = require('path');
const express = require('express');
const { ROOT_DIR } = require('./config');
const { createDatabase, createProductRepository } = require('./db/database');
const { enableCors } = require('./middleware/cors');
const { handleError } = require('./middleware/error');
const { createHealthRouter } = require('./routes/health.routes');
const { createProductsRouter } = require('./routes/products.routes');

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
  app.use(handleError);

  app.closeDatabase = () => db.close();

  return app;
}

module.exports = { createApp };
