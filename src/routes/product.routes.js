const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;