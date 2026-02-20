// src/auth/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children, requiredLevel = 0, requiredPermission }) => {
  const { user, loading, getUserLevel, hasPermission } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">A carregar...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Verificar nível de acesso
  if (requiredLevel > 0 && getUserLevel() > requiredLevel) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4><i className="bi bi-shield-exclamation me-2"></i>Acesso Negado</h4>
          <p>O seu nível de acesso não permite visualizar esta página.</p>
          <a href="/" className="btn btn-primary">Voltar ao Dashboard</a>
        </div>
      </div>
    )
  }

  // Verificar permissão específica
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4><i className="bi bi-lock me-2"></i>Sem Permissão</h4>
          <p>Não tem permissão para aceder a esta funcionalidade.</p>
          <a href="/" className="btn btn-outline-primary">Voltar</a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute