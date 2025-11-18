import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function ProductList(){
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getProducts()
      // assume data is list
      setProductos(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await api.deleteProduct(id)
      setProductos(prev => prev.filter(p => String(p.id) !== String(id)))
    } catch (err) {
      alert('Error al eliminar: ' + (err.message || ''))
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Productos</h3>
        <div>
          <Link to="/productos/nuevo" className="btn btn-primary">Nuevo producto</Link>
        </div>
      </div>

      <div className="card p-3">
        {loading && <p>Cargando...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped">
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
                {productos.map(p => (
                  <tr key={p.id || p._id || p.codigo}>
                    <td>{p.id}</td>
                    <td>{p.codigo}</td>
                    <td>{p.producto}</td>
                    <td>{p.precio}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate('/productos/editar/' + p.id, { state: { product: p } })}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr><td colSpan={5}>No hay productos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
