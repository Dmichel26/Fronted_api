import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

export default function Login(){
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)
    try {
      const data = await api.login(form.username, form.password)
      // assuming API returns token in data['token'] or data['access_token']
      const token = data.token || data.access_token || data['accessToken']
      if (!token) throw new Error('Token no recibido del servidor')
      login(token, { username: form.username })
      navigate('/dashboard')
    } catch (err) {
      setMsg({ type: 'danger', text: err.message || 'Error al iniciar sesión' })
    }
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="mb-3">Iniciar sesión</h3>
            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input className="form-control" name="username" value={form.username} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} />
              </div>
              <button className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
