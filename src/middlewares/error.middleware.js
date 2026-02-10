export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);

    return res.status(400).json({
      message: 'Error de validación',
      errors: messages
    });
  }

  // Error por ID inválido
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  // Error general
  res.status(500).json({
    message: err.message || 'Error interno del servidor'
  });
};