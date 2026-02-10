// URL de la API: usa relativa para local y en Vercel funcionará también
const API = '/api/auth';

const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data); // Para depuración

    if (res.ok) {
      localStorage.setItem('token', data.token);
      msg.textContent = 'Login exitoso';
      msg.style.color = 'green';
      // Redirigir a productos
      window.location.href = '/index.html';
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