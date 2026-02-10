require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || process.env.VERCEL_SECRET_MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar MongoDB', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;