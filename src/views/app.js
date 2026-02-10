// src/views/app.js

// Simulación de token y login
if (!localStorage.getItem('token')) {
  // Para simulación, siempre tenemos un "usuario" logueado
  localStorage.setItem('token', 'test-token');
}

const token = localStorage.getItem('token');

const productList = document.getElementById('productList');
const errorMsg = document.getElementById('error');

let mockProducts = [
  { _id: '1', name: 'Bolso Test', price: 100, stock: 5 },
  { _id: '2', name: 'Bolso Demo', price: 200, stock: 2 }
];

// Cargar productos
function loadProducts() {
  productList.innerHTML = '';
  mockProducts.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.name} | $${p.price} | Stock: ${p.stock}
      <button class="edit" onclick="editProduct('${p._id}', '${p.name}', ${p.price}, ${p.stock})">✎</button>
      <button class="delete" onclick="deleteProduct('${p._id}')">X</button>
    `;
    productList.appendChild(li);
  });
}

// Agregar producto
document.getElementById('addProduct').onclick = addProductHandler;

function addProductHandler() {
  errorMsg.textContent = '';
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  if (!name || !price || !stock) {
    errorMsg.textContent = 'Todos los campos son obligatorios';
    return;
  }

  const newProduct = {
    _id: Date.now().toString(),
    name,
    price: Number(price),
    stock: Number(stock)
  };

  mockProducts.push(newProduct);

  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('stock').value = '';

  loadProducts();
}

// Eliminar producto
function deleteProduct(id) {
  mockProducts = mockProducts.filter(p => p._id !== id);
  loadProducts();
}

// Editar producto
function editProduct(id, name, price, stock) {
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('stock').value = stock;

  const addBtn = document.getElementById('addProduct');
  addBtn.textContent = 'Actualizar';

  addBtn.onclick = () => {
    const updatedName = document.getElementById('name').value;
    const updatedPrice = document.getElementById('price').value;
    const updatedStock = document.getElementById('stock').value;

    if (!updatedName || !updatedPrice || !updatedStock) {
      errorMsg.textContent = 'Todos los campos son obligatorios';
      return;
    }

    mockProducts = mockProducts.map(p =>
      p._id === id
        ? { ...p, name: updatedName, price: Number(updatedPrice), stock: Number(updatedStock) }
        : p
    );

    addBtn.textContent = 'Agregar';
    addBtn.onclick = addProductHandler;

    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';

    loadProducts();
  };
}

// Logout (solo borra token para simulación)
document.getElementById('logout').onclick = () => {
  localStorage.removeItem('token');
  alert('Token eliminado. Recarga la página para simular login.');
};

loadProducts();