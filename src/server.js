const express = require('express');
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());

// Rutas API
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Servir archivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'views')));

// Ruta raíz -> redirige a app.html si estás logueado, login.html si no
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'app.html'));
});

// Ruta login
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));