const { handleError } = require('../src/middleware/error');

function createMockResponse() {
  const response = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  return response;
}

describe('Manejador de errores', () => {
  it('deberia responder 400 cuando el JSON es invalido', () => {
    const response = createMockResponse();
    handleError({ type: 'entity.parse.failed' }, {}, response);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Cuerpo de la peticion invalido' });
  });

  it('deberia responder 500 en errores internos', () => {
    const response = createMockResponse();
    handleError(new Error('boom'), {}, response);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: 'Error interno del servidor' });
  });
});
