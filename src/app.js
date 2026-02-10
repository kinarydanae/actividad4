require('dotenv').config(); // asegurar que las env estén cargadas
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Conectar a MongoDB solo si no es test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// --- RUTAS API ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));

// --- CATCH-ALL PARA FRONTEND ---
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

module.exports = app;