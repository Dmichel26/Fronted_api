/**
 * api.js - Módulo de API con fetch preconfigurado
 * Maneja todas las peticiones HTTP con soporte para JWT
 */

const API = (() => {
  // Detectar base URL automáticamente
  const getBaseUrl = () => {
    // Si estamos en el mismo dominio (servidor Flask), usar rutas relativas
    // Si estamos en desarrollo, usar http://127.0.0.1:5000
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return '';
    }
    return '';
  };

  const BASE_URL = getBaseUrl();

  /**
   * Función genérica para hacer peticiones
   */
  async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...Auth.getAuthHeader(),
      ...options.headers
    };

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      const text = await response.text();
      let data = null;
      
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = text;
      }

      if (!response.ok) {
        // Si es 401, posiblemente el token expiró
        if (response.status === 401) {
          Auth.logout();
          window.location.href = 'index.html';
        }
        throw {
          status: response.status,
          message: data?.msg || data?.message || response.statusText,
          data
        };
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  return {
    // ===== USUARIOS =====
    register(username, password) {
      return request('/users/register', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },

    login(username, password) {
      return request('/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
    },

    // ===== PRODUCTOS =====
    getProductos() {
      return request('/productos', { method: 'GET' });
    },

    createProducto(codigo, producto, precio) {
      return request('/productos', {
        method: 'POST',
        body: JSON.stringify({ codigo, producto, precio: parseFloat(precio) })
      });
    },

    updateProducto(id, data) {
      return request(`/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    deleteProducto(id) {
      return request(`/productos/${id}`, { method: 'DELETE' });
    }
  };
})();
