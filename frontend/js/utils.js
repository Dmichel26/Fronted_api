/**
 * utils.js - Funciones utilitarias y helpers
 */

const Utils = (() => {
  return {
    /**
     * Mostrar alerta en pantalla
     */
    showAlert(message, type = 'info', duration = 4000) {
      let alertDiv = document.getElementById('alert-container');
      
      if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.id = 'alert-container';
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.maxWidth = '400px';
        document.body.appendChild(alertDiv);
      }

      const alert = document.createElement('div');
      alert.className = `alert alert-${type} show`;
      alert.textContent = message;
      alertDiv.appendChild(alert);

      setTimeout(() => {
        alert.remove();
      }, duration);
    },

    /**
     * Mostrar modal
     */
    showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('show');
    },

    /**
     * Ocultar modal
     */
    hideModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('show');
    },

    /**
     * Validar email básico
     */
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Validar campo no vacío
     */
    isNotEmpty(value) {
      return value && value.trim().length > 0;
    },

    /**
     * Validar número positivo
     */
    isPositiveNumber(value) {
      return !isNaN(value) && parseFloat(value) > 0;
    },

    /**
     * Deshabilitar formulario
     */
    disableForm(formId) {
      const form = document.getElementById(formId);
      if (form) {
        const inputs = form.querySelectorAll('input, button, textarea, select');
        inputs.forEach(input => {
          input.disabled = true;
        });
      }
    },

    /**
     * Habilitar formulario
     */
    enableForm(formId) {
      const form = document.getElementById(formId);
      if (form) {
        const inputs = form.querySelectorAll('input, button, textarea, select');
        inputs.forEach(input => {
          input.disabled = false;
        });
      }
    },

    /**
     * Limpiar formulario
     */
    clearForm(formId) {
      const form = document.getElementById(formId);
      if (form) form.reset();
      // Limpiar errores visuales
      form?.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      });
    },

    /**
     * Mostrar error en campo del formulario
     */
    showFormError(fieldId, message) {
      const field = document.getElementById(fieldId);
      if (field) {
        const parent = field.closest('.form-group');
        if (parent) {
          parent.classList.add('error');
          let errorMsg = parent.querySelector('.error-message');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            parent.appendChild(errorMsg);
          }
          errorMsg.textContent = message;
        }
      }
    },

    /**
     * Limpiar errores de campo
     */
    clearFormError(fieldId) {
      const field = document.getElementById(fieldId);
      if (field) {
        const parent = field.closest('.form-group');
        if (parent) {
          parent.classList.remove('error');
          const errorMsg = parent.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        }
      }
    },

    /**
     * Formatear moneda
     */
    formatCurrency(value) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(value);
    },

    /**
     * Formatear fecha
     */
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-CO');
    },

    /**
     * Verificar autenticación
     */
    checkAuth() {
      if (!Auth.isAuthenticated()) {
        window.location.href = 'index.html';
        return false;
      }
      return true;
    }
  };
})();
