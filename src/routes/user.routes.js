const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');

// Todas las rutas requieren usuario autenticado
router.use(authMiddleware);

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener usuario por ID
router.get('/:id', getUserById);

// Actualizar usuario por ID
router.put('/:id', updateUser);

// Eliminar usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;