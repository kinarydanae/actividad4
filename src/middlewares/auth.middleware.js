// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  // --- Si estamos en Vercel y token es mock ---
  if (process.env.VERCEL && token === 'mock_token') {
    req.user = { id: '1' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.VERCEL ? 'mock_secret' : process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Token inválido' });
  }
};