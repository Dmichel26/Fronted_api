export function validateRegister({ username, password }) {
  const errors = {}
  if (!username || username.trim().length < 3) errors.username = 'El usuario debe tener al menos 3 caracteres.'
  if (!password || password.length < 4) errors.password = 'La contraseña debe tener al menos 4 caracteres.'
  return errors
}

export function validateProduct({ codigo, producto, precio }) {
  const errors = {}
  if (!codigo || codigo.trim() === '') errors.codigo = 'Código requerido.'
  if (!producto || producto.trim() === '') errors.producto = 'Nombre del producto requerido.'
  if (precio === undefined || precio === null || precio === '') errors.precio = 'Precio requerido.'
  else if (isNaN(Number(precio)) || Number(precio) < 0) errors.precio = 'Precio inválido.'
  return errors
}
