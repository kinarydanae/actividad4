// src/middlewares/error.middleware.js

// Middleware de manejo de errores en CommonJS
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Imprime el error en consola
  res.status(err.status || 500).json({
    msg: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
