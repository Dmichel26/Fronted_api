/**
 * register.js - Lógica de la página de registro
 */

document.addEventListener('DOMContentLoaded', () => {
  // Si ya está autenticado, redirigir al dashboard
  if (Auth.isAuthenticated()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('registerForm');
  const alert = document.getElementById('alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones
    if (!Utils.isNotEmpty(username)) {
      Utils.showFormError('username', 'El usuario es requerido');
      return;
    }
    if (username.length < 3) {
      Utils.showFormError('username', 'El usuario debe tener al menos 3 caracteres');
      return;
    }
    if (!Utils.isNotEmpty(password)) {
      Utils.showFormError('password', 'La contraseña es requerida');
      return;
    }
    if (password.length < 4) {
      Utils.showFormError('password', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      Utils.showFormError('confirmPassword', 'Las contraseñas no coinciden');
      return;
    }

    Utils.clearFormError('username');
    Utils.clearFormError('password');
    Utils.clearFormError('confirmPassword');

    // Deshabilitar botón durante la petición
    const btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.textContent = 'Registrando...';

    try {
      await API.register(username, password);

      // Mostrar alerta de éxito
      Utils.showAlert('¡Cuenta creada exitosamente! Redirigiendo al login...', 'success', 3000);

      // Redirigir después de 3 segundos
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    } catch (error) {
      console.error('Error en registro:', error);
      
      let message = 'Error al registrar la cuenta.';
      if (error.message && error.message.includes('Usuario ya existe')) {
        message = 'Este usuario ya existe. Por favor, elige otro.';
      } else {
        message = error.message || message;
      }

      Utils.showAlert(message, 'danger');

      btn.disabled = false;
      btn.textContent = 'Registrarse';
    }
  });

  // Limpiar errores al escribir
  document.getElementById('username').addEventListener('input', () => {
    Utils.clearFormError('username');
  });

  document.getElementById('password').addEventListener('input', () => {
    Utils.clearFormError('password');
  });

  document.getElementById('confirmPassword').addEventListener('input', () => {
    Utils.clearFormError('confirmPassword');
  });
});
