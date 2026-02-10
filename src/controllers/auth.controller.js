const bcrypt = require('bcryptjs'); // Importa el módulo bcryptjs para realizar operaciones de hashing de contraseñas
const jwt = require('jsonwebtoken'); // Importa el módulo jsonwebtoken para manejar la generación y verificación de tokens JWT
const User = require('../models/User');// Importa el modelo de usuario para interactuar con la base de datos y realizar operaciones relacionadas con los usuarios

const registerUser = async (req, res) => {/// función asíncrona registerUser que se encargará de manejar el proceso de registro de nuevos usuarios
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Faltan campos' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: 'Usuario registrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en registro' });
  }
};

const loginUser = async (req, res) => { // función asíncrona loginUser que se encargará de manejar el proceso de inicio de sesión de los usuarios
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en login' });
  }
};

module.exports = {
  registerUser,
  loginUser
};