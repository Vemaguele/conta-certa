// src/components/layout/Header.jsx - VERSÃO COMPLETA COM AUTENTICAÇÃO
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const Header = () => {
  const { user, logout, getUserLevel } = useAuth()

  const getRoleBadge = () => {
    if (!user) return null
    
    const level = getUserLevel()
    switch(level) {
      case 1: return <span className="badge bg-danger">Nível 1 - Admin</span>
      case 2: return <span className="badge bg-warning">Nível 2 - Gestor</span>
      case 3: return <span className="badge bg-info">Nível 3 - Utilizador</span>
      default: return null
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="navbar navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Logo e Nome do Sistema */}
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <div className="logo-icon bg-white text-primary rounded p-2 me-2">
              <i className="bi bi-calculator"></i>
            </div>
            <div>
              <div className="fw-bold">ContaPro</div>
              <small className="opacity-75">Sistema Contabilístico</small>
            </div>
          </Link>
          
          {/* Seletor de Exercício (apenas se autenticado) */}
          {user && (
            <div className="ms-4 d-none d-md-block">
              <select className="form-select form-select-sm bg-dark text-light border-dark" style={{ width: '120px' }}>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          )}
        </div>

        {/* Menu do Utilizador */}
        <div className="d-flex align-items-center">
          {user ? (
            <>
              {/* Badge de Nível */}
              <div className="me-3 d-none d-md-block">
                {getRoleBadge()}
              </div>
              
              {/* Notificações */}
              <div className="dropdown me-3">
                <button className="btn btn-link text-light p-0 position-relative" 
                        type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-bell fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                    <span className="visually-hidden">notificações</span>
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><h6 className="dropdown-header">Notificações</h6></li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <div className="d-flex">
                        <div className="me-3">
                          <i className="bi bi-receipt text-success"></i>
                        </div>
                        <div>
                          <div className="fw-medium">Nova fatura emitida</div>
                          <small className="text-muted">Há 2 minutos</small>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item text-center" href="#">
                      Ver todas
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Perfil do Utilizador */}
              <div className="dropdown">
                <button className="btn btn-link text-light dropdown-toggle d-flex align-items-center p-0" 
                        type="button" data-bs-toggle="dropdown">
                  <div className="avatar-circle bg-light text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                       style={{ width: '36px', height: '36px' }}>
                    {getInitials(user.name)}
                  </div>
                  <div className="text-start d-none d-md-block">
                    <div className="fw-medium">{user.name}</div>
                    <div className="small text-light opacity-75">{user.role}</div>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="bi bi-person me-2"></i>Meu Perfil
                    </Link>
                  </li>
                  {getUserLevel() === 1 && (
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        <i className="bi bi-shield-lock me-2"></i>Administração
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/configuracoes">
                      <i className="bi bi-gear me-2"></i>Configurações
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Sair
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            /* Botão de Login se não autenticado */
            <Link to="/login" className="btn btn-outline-light">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header