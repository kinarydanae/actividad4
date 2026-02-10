const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const authMiddleware = require('../middlewares/auth.middleware');

// CRUD productos
router.post('/', authMiddleware, createProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;