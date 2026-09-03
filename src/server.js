const { createApp } = require('./app');
const { DB_PATH, PORT } = require('./config');

const app = createApp({ dbPath: DB_PATH });

app.listen(PORT, () => {
  console.log(`Coca-Cola Stock Portal escuchando en http://localhost:${PORT}`);
});
