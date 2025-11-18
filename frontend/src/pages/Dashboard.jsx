import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  return (
    <div className="container py-4">
      <div className="card p-4">
        <h3>Dashboard</h3>
        <p>Bienvenido, <strong>{user?.username || 'Usuario'}</strong></p>
        <p>Usa el menú para administrar los productos.</p>
      </div>
    </div>
  )
}
