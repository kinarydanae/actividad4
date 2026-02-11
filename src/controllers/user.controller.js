const mongoose = require('mongoose');
const User = require('../models/User');

// GET ALL
const getUsers = async (req, res) => {
  // MOCK
  if (global.mockDB) {
    const users = global.mockDB.users.map(u => ({
      _id: u._id,
      email: u.email
    }));
    return res.json(users);
  }

  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
};

// GET BY ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  // MOCK
  if (global.mockDB) {
    const user = global.mockDB.users.find(u => u._id === id);
    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    return res.json({ _id: user._id, email: user.email });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: 'ID inválido' });

    const user = await User.findById(id).select('-password');
    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json(user);
  } catch {
    res.status(500).json({ msg: 'Error al buscar usuario' });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  // MOCK
  if (global.mockDB) {
    const user = global.mockDB.users.find(u => u._id === id);
    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (email) user.email = email;
    return res.json({ _id: user._id, email: user.email });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: 'ID inválido' });

    const user = await User.findByIdAndUpdate(
      id,
      { email },
      { new: true }
    ).select('-password');

    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json(user);
  } catch {
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // MOCK
  if (global.mockDB) {
    const index = global.mockDB.users.findIndex(u => u._id === id);
    if (index === -1)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    global.mockDB.users.splice(index, 1);
    return res.json({ msg: 'Usuario eliminado (mock)' });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: 'ID inválido' });

    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({ msg: 'Usuario no encontrado' });

    res.json({ msg: 'Usuario eliminado' });
  } catch {
    res.status(500).json({ msg: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
