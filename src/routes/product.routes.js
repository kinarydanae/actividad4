const express = require('express');// Importa Express framework para crear el servidor y manejar rutas
const router = express.Router();// Crea una instancia del enrutador de Express, que se utilizará para definir las rutas relacionadas con los productos

const auth = require('../middlewares/auth.middleware');// Importa el middleware de autenticación para proteger las rutas

const {// Importa las funciones del controlador de productos para manejar las operaciones 
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

// TODAS protegidas por JWT
router.post('/', auth, createProduct);
router.get('/', auth, getProducts);
router.get('/:id', auth, getProductById);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;// Exporta el enrutador para que pueda ser utilizado en otros archivos