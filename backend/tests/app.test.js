const request = require('supertest');

const { createApp } = require('../src/app');

describe('Coca-Cola Stock Portal API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /api/health', () => {
    it('deberia responder 200 con status UP', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/products', () => {
    it('deberia devolver un arreglo con 3 productos', async () => {
      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);

      const ids = response.body.map((product) => product.id);
      expect(ids).toEqual([1, 2, 3]);
    });
  });

  describe('POST /api/products', () => {
    it('deberia agregar un producto nuevo al catalogo', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: 'Fanta Naranja 600ml', stock: 60, price: 1.3 });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        id: 4,
        name: 'Fanta Naranja 600ml',
        stock: 60,
        price: 1.3,
      });

      const catalogResponse = await request(app).get('/api/products');
      expect(catalogResponse.body).toHaveLength(4);
    });

    it('deberia retornar 400 cuando faltan datos del producto', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({ name: '', stock: -1, price: 'abc' });

      expect(response.status).toBe(400);
      expect(response.body.error).toMatch(/Datos del producto invalidos/);
    });
  });

  describe('POST /api/orders', () => {
    it('deberia descontar el stock correctamente', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({ productId: 1, quantity: 50 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Pedido procesado con exito');
      expect(response.body.remainingStock).toBe(100);

      const catalogResponse = await request(app).get('/api/products');
      const updatedProduct = catalogResponse.body.find((product) => product.id === 1);
      expect(updatedProduct.stock).toBe(100);
    });

    it('deberia retornar 400 cuando la cantidad excede el stock', async () => {
      const response = await request(app)
        .post('/api/orders')
        .send({ productId: 3, quantity: 100 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Stock insuficiente');

      const catalogResponse = await request(app).get('/api/products');
      const unchangedProduct = catalogResponse.body.find((product) => product.id === 3);
      expect(unchangedProduct.stock).toBe(45);
    });
  });
});
