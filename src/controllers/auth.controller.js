const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.VERCEL ? 'mock_secret' : process.env.JWT_SECRET;

// REGISTER
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Faltan campos' });

  // MOCK
  if (global.mockDB) {
    const exists = global.mockDB.users.find(u => u.email === email);
    if (exists)
      return res.status(400).json({ msg: 'Usuario ya existe' });

    global.mockDB.users.push({
      _id: Date.now().toString(),
      email,
      password
    });

    return res.status(201).json({ msg: 'Usuario registrado (mock)' });
  }

  // REAL
  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ msg: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });

    res.status(201).json({ msg: 'Usuario registrado' });
  } catch {
    res.status(500).json({ msg: 'Error en registro' });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // MOCK
  if (global.mockDB) {
    const user = global.mockDB.users.find(
      u => u.email === email && u.password === password
    );

    if (!user)
      return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  // REAL
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(500).json({ msg: 'Error en login' });
  }
};

module.exports = { registerUser, loginUser };