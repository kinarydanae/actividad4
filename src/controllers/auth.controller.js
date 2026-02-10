const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Faltan campos' });

  // --- MOCK ---
  if (global.mockDB) {
    const exists = global.mockDB.users.find(u => u.email === email);
    if (exists) return res.status(400).json({ msg: 'El usuario ya existe' });

    const newUser = { _id: Date.now().toString(), email, password };
    global.mockDB.users.push(newUser);
    return res.status(201).json({ msg: 'Usuario registrado (mock)' });
  }

  // --- MongoDB real ---
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword });
    res.status(201).json({ msg: 'Usuario registrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en registro' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // --- MOCK ---
  if (global.mockDB) {
    const user = global.mockDB.users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas (mock)' });

    const token = jwt.sign({ id: user._id }, 'mock_secret', { expiresIn: '1h' });
    return res.json({ token });
  }

  // --- MongoDB real ---
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en login' });
  }
};

module.exports = { registerUser, loginUser };