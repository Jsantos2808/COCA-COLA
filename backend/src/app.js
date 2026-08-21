const express = require('express');

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Coca-Cola Original 600ml', stock: 150, price: 1.5 },
  { id: 2, name: 'Coca-Cola Sin Azucar 600ml', stock: 80, price: 1.5 },
  { id: 3, name: 'Sprite 600ml', stock: 45, price: 1.25 },
];

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_ERROR = 500;

function isValidProductId(productId) {
  return Number.isInteger(productId);
}

function isValidQuantity(quantity) {
  return Number.isInteger(quantity) && quantity > 0;
}

function enableCors(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
}

function createApp() {
  const app = express();
  const products = INITIAL_PRODUCTS.map((product) => ({ ...product }));

  app.use(express.json());
  app.use(enableCors);

  app.get('/api/health', (request, response) => {
    response.status(HTTP_OK).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/products', (request, response) => {
    response.status(HTTP_OK).json(products);
  });

  app.post('/api/orders', (request, response) => {
    const { productId, quantity } = request.body ?? {};
    const product = products.find((item) => item.id === productId);

    if (!isValidProductId(productId) || !isValidQuantity(quantity)) {
      response.status(HTTP_BAD_REQUEST).json({ error: 'Datos del pedido invalidos' });
      return;
    }
    if (!product) {
      response.status(HTTP_NOT_FOUND).json({ error: 'Producto no encontrado' });
      return;
    }
    if (product.stock < quantity) {
      response.status(HTTP_BAD_REQUEST).json({ error: 'Stock insuficiente' });
      return;
    }

    product.stock -= quantity;
    response.status(HTTP_OK).json({
      message: 'Pedido procesado con exito',
      remainingStock: product.stock,
    });
  });

  app.use((error, request, response, next) => {
    if (error.type === 'entity.parse.failed') {
      response.status(HTTP_BAD_REQUEST).json({ error: 'Cuerpo de la peticion invalido' });
      return;
    }
    response.status(HTTP_INTERNAL_ERROR).json({ error: 'Error interno del servidor' });
  });

  return app;
}

module.exports = { createApp };
