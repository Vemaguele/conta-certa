import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const Sidebar = () => {
  const { user, hasPermission, logout, getUserLevel } = useAuth()
  const [expandedSections, setExpandedSections] = useState({
    principal: true,
    financeira: true,
    operacional: true,
    gestao: true,
    configuracoes: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Menu Principal
  const mainMenu = [
    { icon: 'bi-house-door', label: 'Dashboard', path: '/', exact: true },
    { icon: 'bi-receipt', label: 'Faturação', path: '/faturacao', permission: 'Faturação' },
    { icon: 'bi-calculator', label: 'Contabilidade', path: '/contabilidade', permission: 'Contabilidade' },
    { icon: 'bi-people', label: 'Clientes', path: '/clientes', permission: 'Clientes' },
    { icon: 'bi-building', label: 'Fornecedores', path: '/fornecedores', permission: 'Fornecedores' },
    { icon: 'bi-bar-chart', label: 'Relatórios', path: '/relatorios', permission: 'Relatórios' },
    { icon: 'bi-cash-coin', label: 'Bancos', path: '/bancos', permission: 'Bancos' }
  ]

  // Menu Financeira
  const financeMenu = [
    { icon: 'bi-cash-stack', label: 'Tesouraria', path: '/tesouraria', permission: 'Tesouraria' },
    { icon: 'bi-percent', label: 'IVA/Impostos', path: '/iva-impostos', permission: 'IVA/Impostos' },
    { icon: 'bi-credit-card', label: 'Folha de Pagamento', path: '/folha-pagamento', permission: 'Folha de Pagamento' }
  ]

  // Menu Operacional
  const operationsMenu = [
    { icon: 'bi-box-seam', label: 'Stock Básico', path: '/stock', permission: 'Stock Básico' },
    { icon: 'bi-cart', label: 'Compras', path: '/compras', permission: 'Compras' },
    { icon: 'bi-graph-up', label: 'Vendas & CRM', path: '/vendas-crm', permission: 'Vendas & CRM' },
    { icon: 'bi-building', label: 'Imobilizado', path: '/imobilizado', permission: 'Imobilizado' }
  ]

  // Menu Gestão
  const managementMenu = [
    { icon: 'bi-folder', label: 'Document Management', path: '/documentos', permission: 'Document Management' },
    { icon: 'bi-file-earmark-text', label: 'E-faturação', path: '/e-faturacao', permission: 'E-faturação' },
    { icon: 'bi-clipboard-data', label: 'Controlo de Gestão', path: '/controlo-gestao', permission: 'Controlo de Gestão' },
    { icon: 'bi-kanban', label: 'Projetos', path: '/projetos', permission: 'Projetos' },
    { icon: 'bi-phone', label: 'Mobile Access', path: '/mobile', permission: 'Mobile Access' }
  ]

  // Menu Configurações
  const configuracoesMenu = [
    { icon: 'bi-gear', label: 'Configurações Gerais', path: '/configuracoes', permission: 'Configurações' },
    { icon: 'bi-puzzle', label: 'Módulos', path: '/configuracoes/modulos', permission: 'Configurações' },
    { icon: 'bi-list-nested', label: 'Plano de Contas', path: '/configuracoes/plano-contas', permission: 'Configurações' },
    { icon: 'bi-file-text', label: 'Séries Documentos', path: '/configuracoes/series', permission: 'Configurações' },
    { icon: 'bi-currency-exchange', label: 'Tipos Pagamento', path: '/configuracoes/tipos-pagamento', permission: 'Configurações' },
    { icon: 'bi-percent', label: 'Taxas IVA', path: '/configuracoes/iva', permission: 'Configurações' },
    { icon: 'bi-people', label: 'Terceiros Iniciais', path: '/configuracoes/terceiros', permission: 'Configurações' }
  ]

  // Filtrar menus por permissão
  const filteredMainMenu = mainMenu.filter(item => !item.permission || hasPermission(item.permission))
  const filteredFinanceMenu = financeMenu.filter(item => hasPermission(item.permission))
  const filteredOperationsMenu = operationsMenu.filter(item => hasPermission(item.permission))
  const filteredManagementMenu = managementMenu.filter(item => hasPermission(item.permission))
  const filteredConfiguracoesMenu = configuracoesMenu.filter(item => hasPermission(item.permission))

  const getLevelBadge = () => {
    if (!user) return null
    const level = getUserLevel()
    switch(level) {
      case 1: return <span className="badge bg-danger">Nível 1 (Admin)</span>
      case 2: return <span className="badge bg-warning">Nível 2 (Manager)</span>
      case 3: return <span className="badge bg-info">Nível 3 (User)</span>
      default: return null
    }
  }

  return (
    <aside className="sidebar bg-dark text-light vh-100 position-fixed" style={{ width: '280px', overflowY: 'auto' }}>
      <div className="p-3">
        {/* Perfil do Utilizador */}
        {user && (
          <div className="user-profile mb-4 p-3 bg-dark bg-opacity-25 rounded">
            <div className="d-flex align-items-center mb-2">
              <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-person-fill"></i>
              </div>
              <div className="ms-3">
                <div className="fw-bold">{user.name}</div>
                <small className="text-light opacity-75">{user.role}</small>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {getLevelBadge()}
              <button className="btn btn-sm btn-outline-light" onClick={logout} title="Sair">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Menu Principal */}
        {filteredMainMenu.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 px-2">
              <span className="text-uppercase small fw-bold opacity-75">Menu Principal</span>
            </div>
            <nav className="nav flex-column">
              {filteredMainMenu.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `nav-link py-2 px-3 rounded mb-1 d-flex align-items-center text-light ${
                      isActive ? 'bg-primary' : 'hover-bg'
                    }`
                  }
                >
                  <i className={`bi ${item.icon} me-3`}></i>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Seção Financeira */}
        {filteredFinanceMenu.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
                 onClick={() => toggleSection('financeira')}>
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-wallet2 me-2"></i>Financeira
              </span>
              <i className={`bi ${expandedSections.financeira ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            {expandedSections.financeira && (
              <nav className="nav flex-column">
                {filteredFinanceMenu.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 text-light ${
                        isActive ? 'bg-info' : 'hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Seção Operacional */}
        {filteredOperationsMenu.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
                 onClick={() => toggleSection('operacional')}>
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-gear me-2"></i>Operacional
              </span>
              <i className={`bi ${expandedSections.operacional ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            {expandedSections.operacional && (
              <nav className="nav flex-column">
                {filteredOperationsMenu.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 text-light ${
                        isActive ? 'bg-success' : 'hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Seção Gestão */}
        {filteredManagementMenu.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
                 onClick={() => toggleSection('gestao')}>
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-clipboard-data me-2"></i>Gestão
              </span>
              <i className={`bi ${expandedSections.gestao ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            {expandedSections.gestao && (
              <nav className="nav flex-column">
                {filteredManagementMenu.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 text-light ${
                        isActive ? 'bg-purple' : 'hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Seção Configurações */}
        {filteredConfiguracoesMenu.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
                 onClick={() => toggleSection('configuracoes')}>
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-gear-wide-connected me-2"></i>Configurações
              </span>
              <i className={`bi ${expandedSections.configuracoes ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            {expandedSections.configuracoes && (
              <nav className="nav flex-column">
                {filteredConfiguracoesMenu.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 text-light ${
                        isActive ? 'bg-secondary' : 'hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Status do Sistema */}
        <div className="system-status mt-5 p-3 bg-dark bg-opacity-25 rounded">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-uppercase fw-bold">Status</small>
            <span className="badge bg-success">
              <i className="bi bi-circle-fill me-1"></i>Online
            </span>
          </div>
          <div className="d-flex justify-content-between small mb-1">
            <span className="opacity-75">Utilizador:</span>
            <span className="fw-bold">{user?.name || 'Não autenticado'}</span>
          </div>
          <div className="d-flex justify-content-between small">
            <span className="opacity-75">Nível:</span>
            <span className="fw-bold">{getLevelBadge() || 'N/A'}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar