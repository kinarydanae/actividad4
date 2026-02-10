const express = require('express'); // Importa Express framework para crear el servidor y manejar rutas
const router = express.Router(); // Crea una instancia del enrutador de Express, que se utilizará para definir las rutas relacionadas con la autenticación de usuarios

const {// Importa las funciones del controlador de autenticación desde el archivo auth.controller.js ubicado en la carpeta controllers
  registerUser,
  loginUser
} = require('../controllers/auth.controller');

router.post('/register', registerUser);// Define la ruta POST para manejar el registro 
router.post('/login', loginUser);// Define la ruta POST para manejar el inicio de sesión de los usuarios

module.exports = router;