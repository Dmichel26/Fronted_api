import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { validateRegister } from '../utils/validators'

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState(null)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validateRegister(form)
    setErrors(v)
    if (Object.keys(v).length) return
    try {
      await api.register(form.username, form.password)
      setMsg({ type: 'success', text: 'Usuario creado. Ahora inicia sesión.' })
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setMsg({ type: 'danger', text: err.message || 'Error al registrar' })
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-3">Registro</h3>
            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input className={`form-control ${errors.username ? 'is-invalid' : ''}`} name="username" value={form.username} onChange={handleChange} />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={form.password} onChange={handleChange} />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button className="btn btn-primary">Crear cuenta</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
