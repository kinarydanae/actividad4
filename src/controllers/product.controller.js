const mongoose = require('mongoose');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || price == null || stock == null) return res.status(400).json({ msg: 'Faltan campos' });

  // --- MOCK ---
  if (global.mockDB) {
    const newProduct = { _id: Date.now().toString(), name, price, stock };
    global.mockDB.products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  // --- MongoDB real ---
  try {
    const product = await Product.create({ name, price, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear producto' });
  }
};

const getProducts = async (req, res) => {
  if (global.mockDB) return res.json(global.mockDB.products);

  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  if (global.mockDB) {
    const product = global.mockDB.products.find(p => p._id === id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado (mock)' });
    return res.json(product);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID inválido' });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar producto' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (global.mockDB) {
    const product = global.mockDB.products.find(p => p._id === id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado (mock)' });

    Object.assign(product, req.body);
    return res.json(product);
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID inválido' });
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar producto' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (global.mockDB) {
    const index = global.mockDB.products.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ msg: 'Producto no encontrado (mock)' });
    global.mockDB.products.splice(index, 1);
    return res.json({ msg: 'Producto eliminado (mock)' });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'ID inválido' });
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };