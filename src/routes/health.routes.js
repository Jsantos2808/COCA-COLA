const HTTP_OK = 200;

function createHealthRouter() {
  const router = require('express').Router();

  router.get('/health', (request, response) => {
    response.status(HTTP_OK).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}

module.exports = { createHealthRouter };
