const API = "/api/products";
const token = localStorage.getItem('token');

if (!token && window.location.pathname !== "/login.html") {
  window.location.href = '/login.html';
}

const productList = document.getElementById('productList');
const errorMsg = document.getElementById('error');

// Cargar productos
async function loadProducts() {
  const res = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
  const products = await res.json();
  productList.innerHTML = '';

  products.forEach(p => {
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

async function addProductHandler() {
  errorMsg.textContent = '';
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, price, stock })
  });

  if (!res.ok) {
    errorMsg.textContent = 'Todos los campos son obligatorios';
    return;
  }

  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('stock').value = '';

  loadProducts();
}

// Eliminar producto
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  loadProducts();
}

// Editar producto
async function editProduct(id, name, price, stock) {
  // Llenar inputs con los datos existentes
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('stock').value = stock;

  // Cambiar botón de agregar a actualizar
  const addBtn = document.getElementById('addProduct');
  addBtn.textContent = 'Actualizar';
  
  addBtn.onclick = async () => {
    const updatedName = document.getElementById('name').value;
    const updatedPrice = document.getElementById('price').value;
    const updatedStock = document.getElementById('stock').value;

    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ name: updatedName, price: updatedPrice, stock: updatedStock })
    });

    if (!res.ok) {
      errorMsg.textContent = 'Error al actualizar producto';
      return;
    }

    // Restaurar botón
    addBtn.textContent = 'Agregar';
    addBtn.onclick = addProductHandler; // referenciar la función original
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';

    loadProducts();
  };
}

// Logout
document.getElementById('logout').onclick = () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
};

loadProducts();