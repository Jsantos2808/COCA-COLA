const API_BASE_URL = 'http://localhost:3000';

const STOCK_BADGE_LEVELS = [
  { threshold: 100, className: 'bg-green-100 text-green-700' },
  { threshold: 50, className: 'bg-yellow-100 text-yellow-700' },
  { threshold: 0, className: 'bg-red-100 text-red-700' }
];

const TOAST_STYLES = {
  success: 'bg-green-600 text-white',
  error: 'bg-coke text-white',
  info: 'bg-ink text-white'
};

const elements = {
  productsGrid: document.getElementById('products-grid'),
  loadingMessage: document.getElementById('loading-message'),
  refreshButton: document.getElementById('refresh-btn'),
  addProductButton: document.getElementById('add-product-btn'),
  toastContainer: document.getElementById('toast-container'),
  orderModal: document.getElementById('order-modal'),
  orderForm: document.getElementById('order-form'),
  productSelect: document.getElementById('product-select'),
  quantityInput: document.getElementById('quantity-input'),
  modalStockInfo: document.getElementById('modal-stock-info'),
  cancelButton: document.getElementById('cancel-order-btn'),
  submitButton: document.getElementById('submit-order-btn'),
  productModal: document.getElementById('product-modal'),
  productForm: document.getElementById('product-form'),
  productNameInput: document.getElementById('product-name-input'),
  productStockInput: document.getElementById('product-stock-input'),
  productPriceInput: document.getElementById('product-price-input'),
  cancelProductButton: document.getElementById('cancel-product-btn'),
  submitProductButton: document.getElementById('submit-product-btn'),
  entryModal: document.getElementById('entry-modal'),
  entryForm: document.getElementById('entry-form'),
  entryProductSelect: document.getElementById('entry-product-select'),
  entryQuantityInput: document.getElementById('entry-quantity-input'),
  entryStockInfo: document.getElementById('entry-stock-info'),
  cancelEntryButton: document.getElementById('cancel-entry-btn'),
  submitEntryButton: document.getElementById('submit-entry-btn')
};

let products = [];

function escapeHtml(value) {
  const container = document.createElement('div');
  container.textContent = String(value);
  return container.innerHTML;
}

function getStockBadgeClass(stock) {
  const level = STOCK_BADGE_LEVELS.find((item) => stock > item.threshold);
  return level ? level.className : STOCK_BADGE_LEVELS[STOCK_BADGE_LEVELS.length - 1].className;
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function showToast(type, message) {
  const toast = document.createElement('div');
  toast.className = `${TOAST_STYLES[type]} px-4 py-3 rounded-lg shadow-lg text-sm font-semibold`;
  toast.setAttribute('role', 'alert');
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function renderProducts() {
  elements.productsGrid.innerHTML = products
    .map(
      (product) => `
      <article class="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 border-t-4 border-coke">
        <h3 class="font-bold text-lg leading-snug">${escapeHtml(product.name)}</h3>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-black">${formatPrice(product.price)}</span>
          <span class="px-3 py-1 rounded-full text-sm font-semibold ${getStockBadgeClass(product.stock)}">
            Stock: ${product.stock}
          </span>
        </div>
        <div class="mt-auto grid grid-cols-2 gap-2">
          <button type="button" data-product-id="${product.id}"
            class="entry-btn border border-ink text-ink font-bold px-3 py-2 rounded-lg hover:bg-neutral-100 transition">
            Dar entrada
          </button>
          <button type="button" data-product-id="${product.id}"
            class="order-btn bg-ink text-white font-bold px-3 py-2 rounded-lg hover:bg-neutral-700 transition">
            Despachar
          </button>
        </div>
      </article>`
    )
    .join('');

  document.querySelectorAll('.order-btn').forEach((button) => {
    button.addEventListener('click', () => openOrderModal(Number(button.dataset.productId)));
  });
  document.querySelectorAll('.entry-btn').forEach((button) => {
    button.addEventListener('click', () => openEntryModal(Number(button.dataset.productId)));
  });
}

function populateProductSelect() {
  const options = products
    .map((product) => `<option value="${product.id}">${escapeHtml(product.name)}</option>`)
    .join('');
  elements.productSelect.innerHTML = options;
  elements.entryProductSelect.innerHTML = options;
}

function getSelectedProduct() {
  return products.find((item) => item.id === Number(elements.productSelect.value));
}

function getSelectedEntryProduct() {
  return products.find((item) => item.id === Number(elements.entryProductSelect.value));
}

function updateModalStockInfo() {
  const product = getSelectedProduct();
  elements.modalStockInfo.textContent = product ? `Stock disponible: ${product.stock} unidades` : '';
}

function updateEntryStockInfo() {
  const product = getSelectedEntryProduct();
  elements.entryStockInfo.textContent = product ? `Stock actual: ${product.stock} unidades` : '';
}

function openOrderModal(productId) {
  if (productId) {
    elements.productSelect.value = String(productId);
  }
  elements.quantityInput.value = '1';
  updateModalStockInfo();
  elements.orderModal.classList.remove('hidden');
}

function closeOrderModal() {
  elements.orderModal.classList.add('hidden');
}

function openProductModal() {
  elements.productNameInput.value = '';
  elements.productStockInput.value = '0';
  elements.productPriceInput.value = '1.00';
  elements.productModal.classList.remove('hidden');
  elements.productNameInput.focus();
}

function closeProductModal() {
  elements.productModal.classList.add('hidden');
}

function openEntryModal(productId) {
  if (productId) {
    elements.entryProductSelect.value = String(productId);
  }
  elements.entryQuantityInput.value = '1';
  updateEntryStockInfo();
  elements.entryModal.classList.remove('hidden');
}

function closeEntryModal() {
  elements.entryModal.classList.add('hidden');
}

async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('La API no respondio correctamente. Reinicia el backend (npm start en /backend).');
  }
  return response.json();
}

async function loadProducts(showFeedback = false) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    products = await parseJsonResponse(response);
    renderProducts();
    populateProductSelect();
    if (showFeedback) {
      showToast('info', 'Inventario sincronizado');
    }
  } catch {
    showToast('error', 'No se pudo cargar el inventario. Verifica que la API este disponible.');
  } finally {
    elements.loadingMessage.classList.add('hidden');
  }
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const payload = {
    productId: Number(elements.productSelect.value),
    quantity: Number(elements.quantityInput.value)
  };

  try {
    elements.submitButton.disabled = true;
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(result.error || 'No se pudo procesar el pedido');
    }

    closeOrderModal();
    showToast('success', `${result.message} Stock restante: ${result.remainingStock}`);
    await loadProducts();
  } catch (error) {
    showToast('error', error.message);
  } finally {
    elements.submitButton.disabled = false;
  }
}

async function handleProductSubmit(event) {
  event.preventDefault();

  const payload = {
    name: elements.productNameInput.value.trim(),
    stock: Number(elements.productStockInput.value),
    price: Number(elements.productPriceInput.value)
  };

  try {
    elements.submitProductButton.disabled = true;
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(result.error || 'No se pudo agregar el producto');
    }

    closeProductModal();
    showToast('success', `Producto agregado: ${result.name}`);
    await loadProducts();
  } catch (error) {
    showToast('error', error.message);
  } finally {
    elements.submitProductButton.disabled = false;
  }
}

async function handleEntrySubmit(event) {
  event.preventDefault();

  const payload = {
    productId: Number(elements.entryProductSelect.value),
    quantity: Number(elements.entryQuantityInput.value)
  };

  try {
    elements.submitEntryButton.disabled = true;
    const response = await fetch(`${API_BASE_URL}/api/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(result.error || 'No se pudo registrar la entrada');
    }

    closeEntryModal();
    showToast('success', `${result.message}. Stock actual: ${result.currentStock}`);
    await loadProducts();
  } catch (error) {
    showToast('error', error.message);
  } finally {
    elements.submitEntryButton.disabled = false;
  }
}

elements.refreshButton.addEventListener('click', () => loadProducts(true));
elements.addProductButton.addEventListener('click', openProductModal);
elements.cancelButton.addEventListener('click', closeOrderModal);
elements.cancelProductButton.addEventListener('click', closeProductModal);
elements.cancelEntryButton.addEventListener('click', closeEntryModal);
elements.orderForm.addEventListener('submit', handleOrderSubmit);
elements.productForm.addEventListener('submit', handleProductSubmit);
elements.entryForm.addEventListener('submit', handleEntrySubmit);
elements.productSelect.addEventListener('change', updateModalStockInfo);
elements.entryProductSelect.addEventListener('change', updateEntryStockInfo);

loadProducts();
