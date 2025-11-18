/**
 * productos.js - Lógica del CRUD de productos
 */

let editingProductId = null;

document.addEventListener('DOMContentLoaded', () => {
  // Verificar autenticación
  Utils.checkAuth();

  // Setup de eventos
  setupEventListeners();

  // Cargar productos
  loadProductos();
});

/**
 * Configurar listeners de eventos
 */
function setupEventListeners() {
  // Botón nuevo producto
  document.getElementById('newProductBtn').addEventListener('click', () => {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Nuevo Producto';
    Utils.clearForm('productForm');
    Utils.showModal('productModal');
  });

  // Cerrar modal
  document.getElementById('modalCloseBtn').addEventListener('click', () => {
    Utils.hideModal('productModal');
  });

  document.getElementById('modalCancelBtn').addEventListener('click', () => {
    Utils.hideModal('productModal');
  });

  // Cerrar modal al hacer click fuera
  document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
      Utils.hideModal('productModal');
    }
  });

  // Enviar formulario
  document.getElementById('modalSubmitBtn').addEventListener('click', handleSaveProduct);

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    Auth.logout();
    window.location.href = 'index.html';
  });
}

/**
 * Cargar y mostrar productos
 */
async function loadProductos() {
  try {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '<div class="spinner"><div class="loading"></div><p>Cargando productos...</p></div>';

    const productos = await API.getProductos();
    const productosList = Array.isArray(productos) ? productos : [];

    if (productosList.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No hay productos</h3>
          <p>Comienza a crear productos haciendo click en "Nuevo Producto"</p>
        </div>
      `;
      return;
    }

    // Construir tabla
    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
    `;

    productosList.forEach(producto => {
      const precio = Utils.formatCurrency(producto.precio);
      tableHtml += `
        <tr>
          <td>${producto.id}</td>
          <td>${producto.codigo}</td>
          <td>${producto.producto}</td>
          <td>${precio}</td>
          <td>
            <div class="actions">
              <button class="btn btn-warning" onclick="editProducto(${producto.id}, '${producto.codigo}', '${producto.producto}', ${producto.precio})">Editar</button>
              <button class="btn btn-danger" onclick="deleteProducto(${producto.id})">Eliminar</button>
            </div>
          </td>
        </tr>
      `;
    });

    tableHtml += `
        </tbody>
      </table>
    `;

    container.innerHTML = tableHtml;
  } catch (error) {
    console.error('Error al cargar productos:', error);
    document.getElementById('productsContainer').innerHTML = `
      <div class="alert alert-danger show">
        Error al cargar los productos: ${error.message}
      </div>
    `;
  }
}

/**
 * Abrir modal para editar producto
 */
function editProducto(id, codigo, producto, precio) {
  editingProductId = id;
  document.getElementById('modalTitle').textContent = 'Editar Producto';
  document.getElementById('codigo').value = codigo;
  document.getElementById('producto').value = producto;
  document.getElementById('precio').value = precio;
  Utils.showModal('productModal');
}

/**
 * Guardar producto (crear o actualizar)
 */
async function handleSaveProduct() {
  const codigo = document.getElementById('codigo').value.trim();
  const producto = document.getElementById('producto').value.trim();
  const precio = document.getElementById('precio').value;

  // Validaciones
  if (!Utils.isNotEmpty(codigo)) {
    Utils.showFormError('codigo', 'El código es requerido');
    return;
  }
  if (!Utils.isNotEmpty(producto)) {
    Utils.showFormError('producto', 'El nombre del producto es requerido');
    return;
  }
  if (!Utils.isPositiveNumber(precio)) {
    Utils.showFormError('precio', 'El precio debe ser un número positivo');
    return;
  }

  Utils.clearFormError('codigo');
  Utils.clearFormError('producto');
  Utils.clearFormError('precio');

  const btn = document.getElementById('modalSubmitBtn');
  btn.disabled = true;
  btn.textContent = editingProductId ? 'Actualizando...' : 'Creando...';

  try {
    if (editingProductId) {
      // Actualizar
      await API.updateProducto(editingProductId, {
        codigo,
        producto,
        precio: parseFloat(precio)
      });
      Utils.showAlert('Producto actualizado exitosamente', 'success');
    } else {
      // Crear
      await API.createProducto(codigo, producto, precio);
      Utils.showAlert('Producto creado exitosamente', 'success');
    }

    Utils.hideModal('productModal');
    loadProductos();
  } catch (error) {
    console.error('Error al guardar producto:', error);
    Utils.showAlert(error.message || 'Error al guardar el producto', 'danger');
  } finally {
    btn.disabled = false;
    btn.textContent = editingProductId ? 'Actualizar' : 'Guardar';
  }
}

/**
 * Eliminar producto
 */
async function deleteProducto(id) {
  if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    return;
  }

  try {
    await API.deleteProducto(id);
    Utils.showAlert('Producto eliminado exitosamente', 'success');
    loadProductos();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    Utils.showAlert(error.message || 'Error al eliminar el producto', 'danger');
  }
}
