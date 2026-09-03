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
});
