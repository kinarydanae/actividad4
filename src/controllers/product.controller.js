const Product = require('../models/Product'); // tu modelo mongoose

// Crear producto
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al agregar producto' });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
};

// Obtener producto por id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener producto' });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar producto' });
  }
};

// Borrar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto eliminado', _id: product._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar producto' });
  }
};