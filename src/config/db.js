const mongoose = require('mongoose');

const mockData = {
  users: [
    { _id: '1', email: 'demo@user.com', password: 'demo' }
  ],
  products: [
    { _id: '101', name: 'Bolso demo', price: 100, stock: 5 }
  ]
};

const connectDB = async () => {
  // 👉 VERCEL = MOCK
  if (process.env.VERCEL) {
    console.log('🧪 Usando base de datos MOCK (Vercel)');
    global.mockDB = mockData;
    return;
  }

  // 👉 LOCAL = MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB conectado');
  } catch (error) {
    console.error('🔴 Error MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;