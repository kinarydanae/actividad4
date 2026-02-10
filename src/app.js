const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Rutas
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Middleware de errores al final
app.use(errorHandler);

module.exports = app;