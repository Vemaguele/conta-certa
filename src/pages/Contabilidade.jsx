import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Contabilidade = () => {
  const { hasPermission } = useAuth()

  const modulos = [
    { 
      icon: 'bi-journal', 
      title: 'Plano de Contas', 
      desc: 'Gestão do plano de contas (Decreto 70/2009)', 
      path: '/contabilidade/plano-contas',
      color: 'primary',
      permission: 'Contabilidade'
    },
    { 
      icon: 'bi-pencil-square', 
      title: 'Lançamentos', 
      desc: 'Registo de lançamentos contábeis', 
      path: '#',
      color: 'success',
      permission: 'Contabilidade'
    },
    { 
      icon: 'bi-file-spreadsheet', 
      title: 'Balancetes', 
      desc: 'Balancetes de verificação', 
      path: '#',
      color: 'info',
      permission: 'Contabilidade'
    },
    { 
      icon: 'bi-graph-up', 
      title: 'Demonstrações', 
      desc: 'Resultados e Balanço', 
      path: '#',
      color: 'warning',
      permission: 'Contabilidade'
    }
  ]

  const modulosVisiveis = modulos.filter(m => !m.permission || hasPermission(m.permission))

  return (
    <div>
      <h3 className="mb-4">
        <i className="bi bi-calculator me-2 text-primary"></i>
        Contabilidade
      </h3>

      <div className="row g-4">
        {modulosVisiveis.map((mod, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <Link to={mod.path} className="text-decoration-none">
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body">
                  <div className={`d-inline-block p-3 rounded-circle mb-3 bg-${mod.color} bg-opacity-10`}>
                    <i className={`bi ${mod.icon} fs-4 text-${mod.color}`}></i>
                  </div>
                  <h5 className="card-title">{mod.title}</h5>
                  <p className="card-text text-muted">{mod.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contabilidade