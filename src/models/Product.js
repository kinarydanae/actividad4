const mongoose = require('mongoose'); // Importa el módulo mongoose para definir el esquema del modelo de producto y manejar la interacción con la base de datos MongoDB

const ProductSchema = new mongoose.Schema({ // Define un nuevo esquema de Mongoose para el modelo de producto, que especifica los campos y sus tipos de datos
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    required: true
  }
}, { timestamps: true }); // Agrega automáticamente campos de marca de tiempo createdAt y updatedAt a cada documento de producto

module.exports = mongoose.model('Product', ProductSchema); //Exporta el modelo de producto creado a partir del esquema ProductSchema para que pueda ser utilizado en otros archivos