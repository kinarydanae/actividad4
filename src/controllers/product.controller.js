const mongoose = require('mongoose');
const Product = require('../models/Product');

// CREATE
const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null)
    return res.status(400).json({ msg: 'Faltan campos' });

  // MOCK
  if (global.mockDB) {
    const newProduct = {
      _id: Date.now().toString(),
      name,
      price,
      stock
    };
    global.mockDB.products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  // REAL
  try {
    const product = await Product.create({ name, price, stock });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

// READ
const getProducts = async (req, res) => {
  if (global.mockDB)
    return res.json(global.mockDB.products);

  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (global.mockDB) {
    const product = global.mockDB.products.find(p => p._id === id);
    if (!product)
      return res.status(404).json({ msg: 'No encontrado' });

    Object.assign(product, req.body);
    return res.json(product);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: 'ID inválido' });

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product)
      return res.status(404).json({ msg: 'No encontrado' });

    res.json(product);
  } catch {
    res.status(500).json({ msg: 'Error al actualizar' });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (global.mockDB) {
    global.mockDB.products = global.mockDB.products.filter(p => p._id !== id);
    return res.json({ msg: 'Producto eliminado (mock)' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.json({ msg: 'Producto eliminado' });
  } catch {
    res.status(500).json({ msg: 'Error al eliminar' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};