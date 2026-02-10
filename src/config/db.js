// src/config/db.js
const mongoose = require('mongoose');

let mockData = {
  users: [
    { _id: '1', email: 'demo@user.com', password: 'demo' }
  ],
  products: [
    { _id: '101', name: 'Bolso demo', price: 100, stock: 5 }
  ]
};

const connectDB = async () => {
  if (process.env.VERCEL) {
    console.log('Usando base de datos mock (Vercel)');
    global.mockDB = mockData;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar MongoDB', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;