const mongoose = require('mongoose'); // Importa el módulo mongoose para definir el esquema del modelo de usuario y manejar la interacción con la base de datos MongoDB

const UserSchema = new mongoose.Schema({ // Define un nuevo esquema de Mongoose para el modelo de usuario, que especifica los campos y sus tipos de datos
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Agrega automáticamente campos de marca de tiempo createdAt y updatedAt a cada documento de usuario

module.exports = mongoose.model('User', UserSchema); // Exporta el modelo de usuario creado a partir del esquema UserSchema para que pueda ser utilizado en otros archivos