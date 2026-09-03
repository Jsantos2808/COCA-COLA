const HTTP_BAD_REQUEST = 400;

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

function validateStockOperation(productId, quantity, repository, invalidMessage) {
  if (!isValidProductId(productId) || !isValidQuantity(quantity)) {
    return { error: invalidMessage, status: HTTP_BAD_REQUEST };
  }

  const product = repository.findById(productId);
  if (!product) {
    return { error: 'Producto no encontrado', status: 404 };
  }

  return { product };
}

module.exports = {
  isValidProductId,
  isValidQuantity,
  isValidProductPayload,
  validateStockOperation,
};
