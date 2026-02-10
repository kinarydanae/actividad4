const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json()); // ¡muy importante!

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

module.exports = app;
