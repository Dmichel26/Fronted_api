/**
 * auth.js - Módulo de autenticación JWT
 * Maneja el almacenamiento y gestión del token
 */

const Auth = (() => {
  const TOKEN_KEY = 'apiDanaToken';
  const USER_KEY = 'apiDanaUser';

  return {
    /**
     * Guardar token en localStorage
     */
    setToken(token) {
      localStorage.setItem(TOKEN_KEY, token);
    },

    /**
     * Obtener token del localStorage
     */
    getToken() {
      return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Guardar datos del usuario
     */
    setUser(user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    /**
     * Obtener datos del usuario
     */
    getUser() {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    },

    /**
     * Verificar si el usuario está autenticado
     */
    isAuthenticated() {
      return !!this.getToken();
    },

    /**
     * Limpiar autenticación (logout)
     */
    logout() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },

    /**
     * Obtener el header Authorization
     */
    getAuthHeader() {
      const token = this.getToken();
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
  };
})();
