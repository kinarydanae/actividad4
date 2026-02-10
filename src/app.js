const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Conectar DB solo si no es test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Configurar CORS para Vercel
const corsOptions = {
  origin: 'https://actividad4-nine.vercel.app', 
};
app.use(cors(corsOptions));

app.use(express.json());

// Servir archivos estáticos (login, index, js, css)
app.use(express.static(path.join(__dirname, 'views')));

// Rutas API
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));

module.exports = app;