const fs = require('fs');
const os = require('os');
const path = require('path');
const { createDatabase, createProductRepository } = require('../src/db/database');

describe('Persistencia SQLite', () => {
  let db;
  let repository;

  beforeEach(() => {
    db = createDatabase(':memory:');
    repository = createProductRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('deberia persistir productos entre operaciones', () => {
    const created = repository.create({ name: 'Powerade 500ml', stock: 30, price: 1.4 });
    const found = repository.findById(created.id);

    expect(found).toMatchObject({
      name: 'Powerade 500ml',
      stock: 30,
      price: 1.4,
    });
  });

  it('deberia actualizar stock al agregar y remover unidades', () => {
    const product = repository.findById(1);
    repository.addStock(product.id, 10);
    const afterEntry = repository.findById(product.id);
    expect(afterEntry.stock).toBe(product.stock + 10);

    const result = repository.removeStock(product.id, 5);
    expect(result.product.stock).toBe(afterEntry.stock - 5);
  });

  it('deberia persistir en archivo y no reseedar si ya hay productos', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stock-'));
    const dbPath = path.join(tempDir, 'nested', 'inventory.db');

    const firstDb = createDatabase(dbPath);
    const firstRepo = createProductRepository(firstDb);
    firstRepo.create({ name: 'Powerade 500ml', stock: 12, price: 1.4 });
    firstDb.close();

    const secondDb = createDatabase(dbPath);
    const secondRepo = createProductRepository(secondDb);
    const products = secondRepo.findAll();
    secondDb.close();
    fs.rmSync(tempDir, { recursive: true, force: true });

    expect(products).toHaveLength(4);
    expect(products.some((item) => item.name === 'Powerade 500ml')).toBe(true);
  });

  it('deberia retornar null si el producto no existe al cambiar stock', () => {
    expect(repository.addStock(99, 5)).toBeNull();
    expect(repository.removeStock(99, 5)).toBeNull();
  });
});
