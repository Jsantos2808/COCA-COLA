const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_ERROR = 500;

function handleError(error, request, response, _next) {
  if (error.type === 'entity.parse.failed') {
    response.status(HTTP_BAD_REQUEST).json({ error: 'Cuerpo de la peticion invalido' });
    return;
  }

  response.status(HTTP_INTERNAL_ERROR).json({ error: 'Error interno del servidor' });
}

module.exports = { handleError };
