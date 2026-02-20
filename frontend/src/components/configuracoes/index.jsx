// src/components/configuracoes/index.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const ConfiguracoesPage = () => {
  const { hasPermission } = useAuth()

  const configSections = [
    {
      title: 'Sistema',
      icon: 'bi-gear',
      items: [
        { path: '/configuracoes/modulos', label: 'Módulos', icon: 'bi-diagram-3', desc: 'Ativar/desativar módulos do sistema' },
        { path: '/configuracoes/empresa', label: 'Dados da Empresa', icon: 'bi-building', desc: 'Configurar dados da empresa' },
        { path: '/configuracoes/parametros', label: 'Parâmetros Gerais', icon: 'bi-sliders', desc: 'Configurações globais' },
      ]
    },
    {
      title: 'Contabilidade',
      icon: 'bi-calculator',
      items: [
        { path: '/configuracoes/plano-contas', label: 'Plano de Contas', icon: 'bi-list-nested', desc: 'Gerir plano de contas (Decreto 70/2009)' },
        { path: '/configuracoes/contas-padrao', label: 'Contas Padrão', icon: 'bi-star', desc: 'Definir contas para lançamentos automáticos' },
        { path: '/configuracoes/terceiros', label: 'Terceiros Iniciais', icon: 'bi-people', desc: 'Importar clientes e fornecedores' },
      ]
    },
    {
      title: 'Documentos Fiscais',
      icon: 'bi-file-text',
      items: [
        { path: '/configuracoes/series', label: 'Séries de Documentos', icon: 'bi-123', desc: 'Configurar séries para faturas, recibos, NC' },
        { path: '/configuracoes/tipos-pagamento', label: 'Tipos de Pagamento', icon: 'bi-currency-exchange', desc: 'Numerário, transferência, cheque' },
        { path: '/configuracoes/iva', label: 'Taxas de IVA', icon: 'bi-percent', desc: 'Configurar taxas de imposto' },
      ]
    },
    {
      title: 'Segurança',
      icon: 'bi-shield-lock',
      items: [
        { path: '/configuracoes/usuarios', label: 'Utilizadores', icon: 'bi-person-badge', desc: 'Gerir utilizadores e permissões' },
        { path: '/configuracoes/permissoes', label: 'Perfis de Acesso', icon: 'bi-key', desc: 'Níveis 1, 2 e 3 de acesso' },
        { path: '/configuracoes/backup', label: 'Backup', icon: 'bi-database', desc: 'Configurar backups automáticos' },
      ]
    }
  ]

  // Filtrar seções baseado nas permissões
  const filteredSections = configSections.map(section => ({
    ...section,
    items: section.items.filter(item => !item.permission || hasPermission(item.permission))
  })).filter(section => section.items.length > 0)

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-gear-wide-connected me-2"></i>
          Configurações do Sistema
        </h1>
        <div>
          <span className="badge bg-info me-2">Nível 1: Admin</span>
          <span className="badge bg-warning me-2">Nível 2: Manager</span>
          <span className="badge bg-secondary">Nível 3: User</span>
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
                <Link 
                  to={item.path}
                  className="text-decoration-none"
                >
                  <div className="card h-100 shadow-sm hover-shadow transition">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                          <i className={`bi ${item.icon} fs-4 text-primary`}></i>
                        </div>
                        <h6 className="card-title mb-0">{item.label}</h6>
                      </div>
                      <p className="card-text text-muted small">
                        {item.desc}
                      </p>
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