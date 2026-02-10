const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// MOCK AUTH MIDDLEWARE
const authMock = (req, res, next) => {
  req.user = { id: 'mock-user' };
  next();
};

// MOCK CONTROLLERS
const productController = {
  createProduct: (req, res) => res.status(201).json({ ...req.body, _id: 'prod123' }),
  getProducts: (req, res) => res.status(200).json([{ name: 'Bolso Test', _id: 'prod123' }]),
  getProductById: (req, res) => res.status(200).json({ name: 'Bolso Test', _id: req.params.id }),
  updateProduct: (req, res) => res.status(200).json({ ...req.body, _id: req.params.id }),
  deleteProduct: (req, res) => res.status(200).json({ _id: req.params.id })
};

// RUTAS
app.post('/api/products', authMock, productController.createProduct);
app.get('/api/products', authMock, productController.getProducts);
app.get('/api/products/:id', authMock, productController.getProductById);
app.put('/api/products/:id', authMock, productController.updateProduct);
app.delete('/api/products/:id', authMock, productController.deleteProduct);

describe('Product Endpoints (mocked)', () => {
  const product = { name: 'Bolso Test', price: 100 };
  const productId = 'prod123';

  it('should create a new product', async () => {
    const res = await request(app).post('/api/products').send(product);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(product.name);
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get product by id', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(productId);
  });

  it('should update product', async () => {
    const res = await request(app).put(`/api/products/${productId}`).send({ price: 120 });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(120);
  });

  it('should delete product', async () => {
    const res = await request(app).delete(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(productId);
  });
});