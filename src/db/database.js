const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { DATA_DIR } = require('../config');

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Coca-Cola Original 600ml', stock: 150, price: 1.5 },
  { id: 2, name: 'Coca-Cola Sin Azucar 600ml', stock: 80, price: 1.5 },
  { id: 3, name: 'Sprite 600ml', stock: 45, price: 1.25 },
];

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function seedProducts(db) {
  const count = db.prepare('SELECT COUNT(*) AS total FROM products').get().total;
  if (count > 0) {
    return;
  }

  const insert = db.prepare(
    'INSERT INTO products (id, name, stock, price) VALUES (@id, @name, @stock, @price)'
  );

  const seedMany = db.transaction((products) => {
    for (const product of products) {
      insert.run(product);
    }
  });

  seedMany(INITIAL_PRODUCTS);
}

function createDatabase(dbPath) {
  if (dbPath !== ':memory:') {
    ensureDataDirectory();
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      stock INTEGER NOT NULL CHECK (stock >= 0),
      price REAL NOT NULL CHECK (price >= 0)
    )
  `);

  seedProducts(db);
  return db;
}

function createProductRepository(db) {
  const findAllStmt = db.prepare('SELECT id, name, stock, price FROM products ORDER BY id');
  const findByIdStmt = db.prepare('SELECT id, name, stock, price FROM products WHERE id = ?');
  const insertStmt = db.prepare(
    'INSERT INTO products (name, stock, price) VALUES (@name, @stock, @price)'
  );
  const updateStockStmt = db.prepare('UPDATE products SET stock = ? WHERE id = ?');

  return {
    findAll() {
      return findAllStmt.all();
    },

    findById(productId) {
      return findByIdStmt.get(productId);
    },

    create({ name, stock, price }) {
      const result = insertStmt.run({ name, stock, price });
      return findByIdStmt.get(result.lastInsertRowid);
    },

    addStock(productId, quantity) {
      const product = findByIdStmt.get(productId);
      if (!product) {
        return null;
      }

      const newStock = product.stock + quantity;
      updateStockStmt.run(newStock, productId);
      return findByIdStmt.get(productId);
    },

    removeStock(productId, quantity) {
      const product = findByIdStmt.get(productId);
      if (!product) {
        return null;
      }

      if (product.stock < quantity) {
        return { error: 'Stock insuficiente', product };
      }

      const newStock = product.stock - quantity;
      updateStockStmt.run(newStock, productId);
      return { product: findByIdStmt.get(productId) };
    },
  };
}

module.exports = {
  createDatabase,
  createProductRepository,
  INITIAL_PRODUCTS,
};
