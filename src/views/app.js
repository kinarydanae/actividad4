const API = '/api/products';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/login.html';
}

const productList = document.getElementById('productList');
const errorMsg = document.getElementById('error');

// Cargar productos
async function loadProducts() {
  try {
    const res = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const products = await res.json();
    productList.innerHTML = '';

    products.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${p.name} | $${p.price} | Stock: ${p.stock}
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
document.getElementById('addProduct').onclick = async () => {
  errorMsg.textContent = '';

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  if (!name || !price || !stock) {
    errorMsg.textContent = 'Todos los campos son obligatorios';
    return;
  }

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, price, stock })
    });

    if (!res.ok) {
      const data = await res.json();
      errorMsg.textContent = data.msg || 'Error al agregar producto';
      return;
    }

    loadProducts();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error de conexión con el servidor';
  }
};

// Eliminar producto
async function deleteProduct(id) {
  try {
    await fetch(`${API}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadProducts();
  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error al eliminar producto';
  }
}

// Logout
document.getElementById('logout').onclick = () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
};

loadProducts();