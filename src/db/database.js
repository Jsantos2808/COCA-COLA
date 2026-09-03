const fs = require('fs');
const path = require('path');

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Coca-Cola Original 600ml', stock: 150, price: 1.5 },
  { id: 2, name: 'Coca-Cola Sin Azucar 600ml', stock: 80, price: 1.5 },
  { id: 3, name: 'Sprite 600ml', stock: 45, price: 1.25 },
];

class SimpleDatabase {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.data = { products: [] };
    this.init();
  }

  init() {
    if (this.dbPath !== ':memory:') {
      const directory = path.dirname(this.dbPath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      if (fs.existsSync(this.dbPath)) {
        try {
          const content = fs.readFileSync(this.dbPath, 'utf8');
          this.data = JSON.parse(content);
        } catch (err) {
          this.data = { products: INITIAL_PRODUCTS.map(p => ({ ...p })) };
          this.save();
        }
      } else {
        this.data = { products: INITIAL_PRODUCTS.map(p => ({ ...p })) };
        this.save();
      }
    } else {
      this.data = { products: INITIAL_PRODUCTS.map(p => ({ ...p })) };
    }
  }

  save() {
    if (this.dbPath !== ':memory:') {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
    }
  }

  prepare() {
    return new PreparedStatement(this);
  }

  exec() {
    // No-op for initialization
  }

  pragma() {
    // No-op
  }

  transaction(fn) {
    return fn;
  }

  close() {
    this.save();
  }
}

class PreparedStatement {
  constructor(db) {
    this.db = db;
  }

  get() {
    return { total: this.db.data.products.length };
  }

  all() {
    return this.db.data.products;
  }

  run() {
    return { changes: 1 };
  }
}

function createDatabase(dbPath) {
  return new SimpleDatabase(dbPath);
}

function createProductRepository(db) {
  return {
    findAll() {
      return db.data.products.map(p => ({ ...p }));
    },

    findById(productId) {
      const product = db.data.products.find(p => p.id === productId);
      return product ? { ...product } : null;
    },

    create({ name, stock, price }) {
      const maxId = Math.max(...db.data.products.map(p => p.id), 0);
      const newProduct = { id: maxId + 1, name, stock, price };
      db.data.products.push(newProduct);
      db.save();
      return { ...newProduct };
    },

    addStock(productId, quantity) {
      const product = db.data.products.find(p => p.id === productId);
      if (!product) {
        return null;
      }

      product.stock += quantity;
      db.save();
      return { ...product };
    },

    removeStock(productId, quantity) {
      const product = db.data.products.find(p => p.id === productId);
      if (!product) {
        return null;
      }

      if (product.stock < quantity) {
        return { error: 'Stock insuficiente', product: { ...product } };
      }

      product.stock -= quantity;
      db.save();
      return { product: { ...product } };
    },
  };
}

module.exports = {
  createDatabase,
  createProductRepository,
  INITIAL_PRODUCTS,
};
