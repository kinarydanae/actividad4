const API = "/api";

const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      msg.textContent = 'Login exitoso';
      msg.style.color = 'green';
      window.location.href = 'index.html';
    } else {
      msg.textContent = data.msg || 'Error al iniciar sesión';
      msg.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    msg.textContent = 'Error de conexión con el servidor';
    msg.style.color = 'red';
  }
});