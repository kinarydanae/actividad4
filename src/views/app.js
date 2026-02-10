const API = "/api/products";
const token = localStorage.getItem('token');

if (!token && window.location.pathname !== "/login.html") {
  window.location.href = '/login.html';
}

const productList = document.getElementById('productList');
const errorMsg = document.getElementById('error');

// Cargar productos
async function loadProducts() {
  try {
    const res = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('No se pudieron cargar los productos');
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
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error al cargar productos';
  }
}

// Agregar producto
document.getElementById('addProduct').onclick = addProductHandler;

async function addProductHandler() {
  errorMsg.textContent = '';
  const name = document.getElementById('name').value.trim();
  const price = document.getElementById('price').value.trim();
  const stock = document.getElementById('stock').value.trim();

  if (!name || !price || !stock) {
    errorMsg.textContent = 'Todos los campos son obligatorios';
    return;
  }

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, price, stock })
    });

    if (!res.ok) {
      const data = await res.json();
      errorMsg.textContent = data.msg || 'Error al agregar producto';
      return;
    }

    // Limpiar inputs
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';

    loadProducts();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error de conexión';
  }
}

// Eliminar producto
async function deleteProduct(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error('Error al eliminar producto');
    loadProducts();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error al eliminar producto';
  }
}

// Editar producto
async function editProduct(id, name, price, stock) {
  // Llenar inputs con los datos existentes
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('stock').value = stock;

  const addBtn = document.getElementById('addProduct');
  addBtn.textContent = 'Actualizar';

  addBtn.onclick = async () => {
    const updatedName = document.getElementById('name').value.trim();
    const updatedPrice = document.getElementById('price').value.trim();
    const updatedStock = document.getElementById('stock').value.trim();

    if (!updatedName || !updatedPrice || !updatedStock) {
      errorMsg.textContent = 'Todos los campos son obligatorios';
      return;
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ name: updatedName, price: updatedPrice, stock: updatedStock })
      });

      if (!res.ok) {
        const data = await res.json();
        errorMsg.textContent = data.msg || 'Error al actualizar producto';
        return;
      }

      // Restaurar botón original
      addBtn.textContent = 'Agregar';
      addBtn.onclick = addProductHandler;
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('stock').value = '';

      loadProducts();
    } catch (err) {
      console.error(err);
      errorMsg.textContent = 'Error de conexión';
    }
  };
}

// Logout
document.getElementById('logout').onclick = () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
};

// Inicializar
loadProducts();