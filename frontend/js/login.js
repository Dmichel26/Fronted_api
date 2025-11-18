/**
 * login.js - Lógica de la página de login
 */

document.addEventListener('DOMContentLoaded', () => {
  // Si ya está autenticado, redirigir al dashboard
  if (Auth.isAuthenticated()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('loginForm');
  const alert = document.getElementById('alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validaciones
    if (!Utils.isNotEmpty(username)) {
      Utils.showFormError('username', 'El usuario es requerido');
      return;
    }
    if (!Utils.isNotEmpty(password)) {
      Utils.showFormError('password', 'La contraseña es requerida');
      return;
    }

    Utils.clearFormError('username');
    Utils.clearFormError('password');

    // Deshabilitar botón durante la petición
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = 'Entrando...';

    try {
      const response = await API.login(username, password);

      // Verificar que el token viene en la respuesta
      const token = response.access_token || response.token;
      if (!token) {
        throw new Error('No se recibió token del servidor');
      }

      // Guardar token y usuario
      Auth.setToken(token);
      Auth.setUser({ username });

      // Mostrar alerta de éxito
      Utils.showAlert('¡Sesión iniciada correctamente!', 'success', 2000);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } catch (error) {
      console.error('Error en login:', error);
      const message = error.message || 'Error al iniciar sesión. Verifique sus credenciales.';
      
      Utils.showAlert(message, 'danger');

      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  });

  // Limpiar errores al escribir
  document.getElementById('username').addEventListener('input', () => {
    Utils.clearFormError('username');
  });

  document.getElementById('password').addEventListener('input', () => {
    Utils.clearFormError('password');
  });
});
