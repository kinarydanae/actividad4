require('dotenv').config(); // Carga las variables de entorno desde un archivo .env 
const app = require('./app'); // Importa la instancia de la aplicación Express configurada en el archivo app.js

const PORT = process.env.PORT || 3000; //Puerto del server

app.listen(PORT, () => { // Inicia el servidor en el puerto y muestra un mensaje en la consola indicando que el servidor está corriendo
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
