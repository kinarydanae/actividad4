const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// Obtener todos los usuarios
router.get('/', auth, getUsers);
// Obtener usuario por ID
router.get('/:id', auth, getUserById);
// Actualizar usuario por ID
router.put('/:id', auth, updateUser);
// Eliminar usuario por ID
router.delete('/:id', auth, deleteUser);

module.exports = router;