import React from 'react'
import { useAuth } from '../auth/AuthContext'

const Dashboard = () => {
  const { user, getUserLevel } = useAuth()

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          <i className="bi bi-house-door me-2 text-primary"></i>
          Dashboard
        </h3>
        <div>
          <span className="badge bg-primary me-2">Bem-vindo, {user?.name}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Faturação</h5>
              <p className="card-text display-6">0 MT</p>
              <small>Este mês</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Contabilidade</h5>
              <p className="card-text display-6">0 MT</p>
              <small>Resultado do período</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text display-6">0</p>
              <small>Total ativos</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Nível de Acesso</h5>
            </div>
            <div className="card-body">
              <p>Utilizador: <strong>{user?.name}</strong></p>
              <p>Role: <strong>{user?.role}</strong></p>
              <p>Nível: <strong>Nível {getUserLevel()}</strong></p>
              <p>Permissões: {user?.permissions?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard