# API REST - Coca-Cola Stock Portal

Base URL: `http://localhost:3000/api`

## Endpoints

### `GET /health`

Verifica el estado del servicio.

**Respuesta 200:**
```json
{ "status": "UP", "timestamp": "2026-09-02T19:00:00.000Z" }
```

### `GET /products`

Lista todos los productos del inventario.

### `POST /products`

Crea un producto nuevo.

**Body:**
```json
{ "name": "Fanta 600ml", "stock": 40, "price": 1.3 }
```

### `POST /entries`

Registra entrada de stock.

**Body:**
```json
{ "productId": 1, "quantity": 25 }
```

### `POST /orders`

Despacha un pedido y descuenta stock.

**Body:**
```json
{ "productId": 1, "quantity": 2 }
```

## Codigos de error

| Codigo | Descripcion |
|--------|-------------|
| 400 | Datos invalidos o stock insuficiente |
| 404 | Producto no encontrado |
| 500 | Error interno del servidor |
