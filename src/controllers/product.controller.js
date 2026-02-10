const mongoose = require('mongoose'); // Importa el módulo mongoose para definir el esquema del modelo de producto y manejar la interacción con la base de datos 
const Product = require('../models/Product'); // Importa el modelo de producto para interactuar con la base de datos y realizar operaciones relacionadas con los productos

const createProduct = async (req, res) => { // función asíncrona createProduct que se encargará de manejar la creación de un nuevo producto en la base de datos
  try {
    const { name, price, stock } = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({
        msg: 'Faltan campos obligatorios'
      });
    }

    const product = await Product.create({
      name,
      price,
      stock
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al crear producto'
    });
  }
};

const getProducts = async (req, res) => {// función asíncrona getProducts para la obtención de todos los productos desde la base de datos
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener productos'
    });
  }
};

const getProductById = async (req, res) => { // función asíncrona getProductById para la obtención de un producto específico por su ID desde la base de datos
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID inválido'
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        msg: 'Producto no encontrado'
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al buscar producto'
    });
  }
};

const updateProduct = async (req, res) => { // función asíncrona updateProduct que se encargará de manejar la actualización de un producto existente en la base de datos
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID inválido'
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        msg: 'Producto no encontrado'
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar producto'
    });
  }
};

const deleteProduct = async (req, res) => { // función asíncrona deleteProduct que se encargará de manejar la eliminación de un producto existente en la base de datos
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: 'ID inválido'
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        msg: 'Producto no encontrado'
      });
    }

    res.json({
      msg: 'Producto eliminado'
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar producto'
    });
  }
};

module.exports = { // Exporta las funciones del controlador de productos para que puedan ser utilizadas en otros archivos, como en las rutas
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};