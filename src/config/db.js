const mongoose = require('mongoose'); // Importa el módulo mongoose para manejar la conexión a la base de datos MongoDB

const connectDB = async () => { // Define una función asíncrona connectDB que se encargará de establecer la conexión con la base de datos MongoDB utilizando mongoose
  try { // Intenta conectar a MongoDB utilizando la URI de conexión almacenada en las variables de entorno
    await mongoose.connect(process.env.MONGO_URI); // Si la conexión es exitosa, imprime un mensaje en la consola indicando que MongoDB está conectado
    console.log('MongoDB conectado');
  } catch (error) { // Si ocurre un error durante la conexión, imprime un mensaje de error en la consola
    console.error('Error al conectar MongoDB', error.message);
    process.exit(1); // Termina el proceso con un código de error 1 para indicar que la conexión a la base de datos falló
  }
};

module.exports = connectDB; // Exporta la función connectDB para que pueda ser utilizada en otros archivos