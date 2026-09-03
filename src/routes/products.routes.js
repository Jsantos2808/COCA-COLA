const express = require('express');
const {
  isValidProductPayload,
  validateStockOperation,
} = require('../validators/product.validators');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

function createProductsRouter(repository) {
  const router = express.Router();

  router.get('/products', (request, response) => {
    response.status(HTTP_OK).json(repository.findAll());
  });

  router.post('/products', (request, response) => {
    const { name, stock, price } = request.body ?? {};

    if (!isValidProductPayload({ name, stock, price })) {
      response.status(HTTP_BAD_REQUEST).json({
        error: 'Datos del producto invalidos. Requiere name, stock (>=0) y price (>=0)',
      });
      return;
    }

    const product = repository.create({
      name: name.trim(),
      stock,
      price,
    });

    response.status(HTTP_CREATED).json(product);
  });

  router.post('/entries', (request, response) => {
    const { productId, quantity } = request.body ?? {};
    const validation = validateStockOperation(
      productId,
      quantity,
      repository,
      'Datos de entrada invalidos'
    );

    if (validation.error) {
      response.status(validation.status).json({ error: validation.error });
      return;
    }

    const updatedProduct = repository.addStock(productId, quantity);
    response.status(HTTP_OK).json({
      message: 'Entrada de stock registrada',
      productId: updatedProduct.id,
      addedQuantity: quantity,
      currentStock: updatedProduct.stock,
    });
  });

  router.post('/orders', (request, response) => {
    const { productId, quantity } = request.body ?? {};
    const validation = validateStockOperation(
      productId,
      quantity,
      repository,
      'Datos del pedido invalidos'
    );

    if (validation.error) {
      response.status(validation.status).json({ error: validation.error });
      return;
    }

    const result = repository.removeStock(productId, quantity);
    if (result.error) {
      response.status(HTTP_BAD_REQUEST).json({ error: result.error });
      return;
    }

    response.status(HTTP_OK).json({
      message: 'Pedido procesado con exito',
      remainingStock: result.product.stock,
    });
  });

  return router;
}

module.exports = { createProductsRouter };
