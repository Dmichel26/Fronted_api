import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import ProductForm from './pages/ProductForm'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/productos" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/productos/nuevo" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        <Route path="/productos/editar/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        <Route path="*" element={<div className="container py-4"><h3>Página no encontrada</h3></div>} />
      </Routes>
    </div>
  )
}
