const express = require('express');

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Coca-Cola Original 600ml', stock: 150, price: 1.5 },
  { id: 2, name: 'Coca-Cola Sin Azucar 600ml', stock: 80, price: 1.5 },
  { id: 3, name: 'Sprite 600ml', stock: 45, price: 1.25 },
];

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_ERROR = 500;

function isValidProductId(productId) {
  return Number.isInteger(productId);
}

function isValidQuantity(quantity) {
  return Number.isInteger(quantity) && quantity > 0;
}

function isValidProductPayload({ name, stock, price }) {
  const hasName = typeof name === 'string' && name.trim().length > 0;
  const hasStock = Number.isInteger(stock) && stock >= 0;
  const hasPrice = typeof price === 'number' && Number.isFinite(price) && price >= 0;
  return hasName && hasStock && hasPrice;
}

function findProduct(products, productId) {
  return products.find((item) => item.id === productId);
}

function validateStockOperation(productId, quantity, products, invalidMessage) {
  if (!isValidProductId(productId) || !isValidQuantity(quantity)) {
    return { error: invalidMessage, status: HTTP_BAD_REQUEST };
  }

  const product = findProduct(products, productId);
  if (!product) {
    return { error: 'Producto no encontrado', status: HTTP_NOT_FOUND };
  }

  return { product };
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

  app.post('/api/products', (request, response) => {
    const { name, stock, price } = request.body ?? {};

    if (!isValidProductPayload({ name, stock, price })) {
      response.status(HTTP_BAD_REQUEST).json({
        error: 'Datos del producto invalidos. Requiere name, stock (>=0) y price (>=0)',
      });
      return;
    }

    const nextId = products.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    const product = {
      id: nextId,
      name: name.trim(),
      stock,
      price,
    };

    products.push(product);
    response.status(HTTP_CREATED).json(product);
  });

  app.post('/api/entries', (request, response) => {
    const { productId, quantity } = request.body ?? {};
    const validation = validateStockOperation(
      productId,
      quantity,
      products,
      'Datos de entrada invalidos'
    );

    if (validation.error) {
      response.status(validation.status).json({ error: validation.error });
      return;
    }

    validation.product.stock += quantity;
    response.status(HTTP_OK).json({
      message: 'Entrada de stock registrada',
      productId: validation.product.id,
      addedQuantity: quantity,
      currentStock: validation.product.stock,
    });
  });

  app.post('/api/orders', (request, response) => {
    const { productId, quantity } = request.body ?? {};
    const validation = validateStockOperation(
      productId,
      quantity,
      products,
      'Datos del pedido invalidos'
    );

    if (validation.error) {
      response.status(validation.status).json({ error: validation.error });
      return;
    }

    if (validation.product.stock < quantity) {
      response.status(HTTP_BAD_REQUEST).json({ error: 'Stock insuficiente' });
      return;
    }

    validation.product.stock -= quantity;
    response.status(HTTP_OK).json({
      message: 'Pedido procesado con exito',
      remainingStock: validation.product.stock,
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
