import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const ConfiguracoesPage = () => {
  const { hasPermission, getUserLevel } = useAuth()

  const configSections = [
    {
      title: 'Sistema',
      icon: 'bi-gear',
      items: [
        { path: '/configuracoes/modulos', label: 'Módulos', icon: 'bi-puzzle', desc: 'Ativar/desativar módulos' },
        { path: '/configuracoes/empresa', label: 'Dados da Empresa', icon: 'bi-building', desc: 'Configurar dados da empresa' }
      ]
    },
    {
      title: 'Contabilidade',
      icon: 'bi-calculator',
      items: [
        { path: '/configuracoes/plano-contas', label: 'Plano de Contas', icon: 'bi-list-nested', desc: 'Gerir plano de contas' },
        { path: '/configuracoes/terceiros', label: 'Terceiros Iniciais', icon: 'bi-people', desc: 'Importar clientes/fornecedores' }
      ]
    },
    {
      title: 'Documentos Fiscais',
      icon: 'bi-file-text',
      items: [
        { path: '/configuracoes/series', label: 'Séries de Documentos', icon: 'bi-123', desc: 'Configurar séries' },
        { path: '/configuracoes/tipos-pagamento', label: 'Tipos de Pagamento', icon: 'bi-currency-exchange', desc: 'Métodos de pagamento' },
        { path: '/configuracoes/iva', label: 'Taxas de IVA', icon: 'bi-percent', desc: 'Configurar impostos' }
      ]
    }
  ]

  const getNivelBadge = () => {
    const level = getUserLevel()
    switch(level) {
      case 1: return <span className="badge bg-danger ms-2">Admin</span>
      case 2: return <span className="badge bg-warning ms-2">Manager</span>
      case 3: return <span className="badge bg-info ms-2">User</span>
      default: return null
    }
  }

  // Filtrar seções baseado nas permissões
  const filteredSections = configSections.map(section => ({
    ...section,
    items: section.items.filter(item => !item.permission || hasPermission(item.permission))
  })).filter(section => section.items.length > 0)

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-gear-wide-connected fs-1 text-primary me-3"></i>
        <div>
          <h3 className="h4 mb-1">Configurações do Sistema</h3>
          <p className="text-muted mb-0">
            Gerencie as configurações da aplicação
            {getNivelBadge()}
          </p>
        </div>
      </div>

      {filteredSections.map((section, idx) => (
        <div key={idx} className="mb-5">
          <h5 className="mb-3">
            <i className={`bi ${section.icon} me-2`}></i>
            {section.title}
          </h5>
          <div className="row g-4">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx} className="col-md-6 col-lg-4">
                <Link to={item.path} className="text-decoration-none">
                  <div className="card h-100 shadow-sm hover-shadow">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                          <i className={`bi ${item.icon} fs-4 text-primary`}></i>
                        </div>
                        <h6 className="card-title mb-0">{item.label}</h6>
                      </div>
                      <p className="card-text text-muted small">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConfiguracoesPage