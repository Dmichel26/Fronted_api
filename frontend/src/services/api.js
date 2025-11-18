const BASE_URL = 'http://127.0.0.1:5000'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const headers = options.headers || {}
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(BASE_URL + path, { ...options, headers })
  const text = await res.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch (e) { data = text }
  if (!res.ok) {
    const error = (data && data.message) || data || res.statusText
    throw new Error(error)
  }
  return data
}

export const api = {
  register: (username, password) => request('/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }),
  login: (username, password) => request('/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  }),
  getProducts: () => request('/productos', { method: 'GET' }),
  createProduct: (producto) => request('/productos', {
    method: 'POST',
    body: JSON.stringify(producto)
  }),
  updateProduct: (id, body) => request(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  }),
  deleteProduct: (id) => request(`/productos/${id}`, { method: 'DELETE' })
}

export default api
