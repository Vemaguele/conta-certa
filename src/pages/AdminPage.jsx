// src/pages/AdminPage.jsx
import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

const AdminPage = () => {
  const { user, getUserLevel } = useAuth()
  const [tags, setTags] = useState([
    { id: 1, name: 'Tesouraria', enabled: true, level: 1 },
    { id: 2, name: 'IVA/Impostos', enabled: true, level: 1 },
    { id: 3, name: 'Folha de Pagamento', enabled: true, level: 2 },
    { id: 4, name: 'Stock Básico', enabled: true, level: 2 },
    { id: 5, name: 'Compras', enabled: true, level: 2 },
    { id: 6, name: 'Vendas & CRM', enabled: true, level: 3 },
    { id: 7, name: 'Imobilizado', enabled: true, level: 2 },
    { id: 8, name: 'Document Management', enabled: true, level: 3 },
    { id: 9, name: 'E-faturação', enabled: true, level: 1 },
    { id: 10, name: 'Controlo de Gestão', enabled: true, level: 2 },
    { id: 11, name: 'Projetos', enabled: true, level: 2 },
    { id: 12, name: 'Mobile Access', enabled: true, level: 1 }
  ])

  const toggleTag = (id) => {
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, enabled: !tag.enabled } : tag
    ))
  }

  const updateTagLevel = (id, level) => {
    setTags(tags.map(tag => 
      tag.id === id ? { ...tag, level } : tag
    ))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">
            <i className="bi bi-shield-lock me-2"></i>
            Painel de Administração
          </h1>
          <p className="text-muted mb-0">
            Nível {getUserLevel()} - Configuração completa do sistema
          </p>
        </div>
        <div className="badge bg-danger fs-6">
          <i className="bi bi-star-fill me-1"></i>
          Nível 1 - Administrador
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-tags me-2"></i>
                Gestão de Tags e Permissões
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Estado</th>
                      <th>Nível de Acesso</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags.map(tag => (
                      <tr key={tag.id}>
                        <td className="fw-medium">{tag.name}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={tag.enabled}
                              onChange={() => toggleTag(tag.id)}
                            />
                            <label className="form-check-label">
                              {tag.enabled ? 'Ativa' : 'Inativa'}
                            </label>
                          </div>
                        </td>
                        <td>
                          <select 
                            className="form-select form-select-sm"
                            value={tag.level}
                            onChange={(e) => updateTagLevel(tag.id, parseInt(e.target.value))}
                          >
                            <option value={1}>Nível 1 - Admin</option>
                            <option value={2}>Nível 2 - Gestor</option>
                            <option value={3}>Nível 3 - Utilizador</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Estatísticas de Acesso
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6>Níveis de Utilizadores</h6>
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Nível 1 - Administradores</span>
                    <span className="badge bg-danger">2</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Nível 2 - Gestores</span>
                    <span className="badge bg-warning">5</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Nível 3 - Utilizadores</span>
                    <span className="badge bg-info">15</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="btn btn-success w-100">
                  <i className="bi bi-save me-2"></i>
                  Guardar Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage