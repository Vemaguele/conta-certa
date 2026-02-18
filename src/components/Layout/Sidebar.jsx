// src/components/layout/Sidebar.jsx - VERSÃO COMPLETA COM AUTENTICAÇÃO
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const Sidebar = () => {
  const { user, hasPermission, logout } = useAuth()
  const [expandedSections, setExpandedSections] = useState({
    financeira: true,
    operacional: true,
    gestao: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Menu principal - filtrado por permissões
  const mainMenu = [
    { icon: 'bi-house-door', label: 'Dashboard', path: '/', exact: true },
    { icon: 'bi-receipt', label: 'Faturação', path: '/faturacao', permission: 'Faturação' },
    { icon: 'bi-calculator', label: 'Contabilidade', path: '/contabilidade', permission: 'Contabilidade' },
    { icon: 'bi-people', label: 'Clientes', path: '/clientes', permission: 'Clientes' },
    { icon: 'bi-building', label: 'Fornecedores', path: '/fornecedores', permission: 'Fornecedores' },
    { icon: 'bi-bar-chart', label: 'Relatórios', path: '/relatorios', permission: 'Relatórios' },
    { icon: 'bi-cash-coin', label: 'Bancos', path: '/bancos', permission: 'Bancos' },
  ]

  // Menu financeira
  const financeMenu = [
    
    { icon: 'bi-cash-stack', label: 'Tesouraria', path: '/tesouraria', permission: 'Tesouraria' },
    { icon: 'bi-percent', label: 'IVA/Impostos', path: '/iva-impostos', permission: 'IVA/Impostos' },
    { icon: 'bi-credit-card', label: 'Folha de Pagamento', path: '/folha-pagamento', permission: 'Folha de Pagamento' },
    // No Sidebar.jsx, procure esta linha (cerca da linha 39) e faça:
    { icon: 'bi-gear', label: 'Configurações', path: '/configuracoes' }, // Remova: , permission: 'Configurações'
      ]

  // Menu operacional
  const operationsMenu = [
   
    { icon: 'bi-box-seam', label: 'Stock Básico', path: '/stock', permission: 'Stock Básico' },
    { icon: 'bi-cart', label: 'Compras', path: '/compras', permission: 'Compras' },
    { icon: 'bi-graph-up', label: 'Vendas & CRM', path: '/vendas-crm', permission: 'Vendas & CRM' },
    { icon: 'bi-building', label: 'Imobilizado', path: '/imobilizado', permission: 'Imobilizado' },
  ]

  // Menu gestão
  const managementMenu = [
    { icon: 'bi-folder', label: 'Document Management', path: '/documentos', permission: 'Document Management' },
    { icon: 'bi-file-earmark-text', label: 'E-faturação', path: '/e-faturacao', permission: 'E-faturação' },
    { icon: 'bi-clipboard-data', label: 'Controlo de Gestão', path: '/controlo-gestao', permission: 'Controlo de Gestão' },
    { icon: 'bi-kanban', label: 'Projetos', path: '/projetos', permission: 'Projetos' },
    { icon: 'bi-phone', label: 'Mobile Access', path: '/mobile', permission: 'Mobile Access' },
    { icon: 'bi-gear', label: 'Configurações', path: '/configuracoes', permission: 'Configurações' },
    
  ]

  // Filtrar menus baseado nas permissões do usuário
  const filteredMainMenu = mainMenu.filter(item => 
    !item.permission || hasPermission(item.permission)
  )
  
  const filteredFinanceMenu = financeMenu.filter(item => 
    hasPermission(item.permission)
  )
  
  const filteredOperationsMenu = operationsMenu.filter(item => 
    hasPermission(item.permission)
  )
  
  const filteredManagementMenu = managementMenu.filter(item => 
    hasPermission(item.permission)
  )

  // Função para obter badge de nível
  const getLevelBadge = () => {
    if (!user) return null
    
    switch(user.role) {
      case 'admin': return <span className="badge bg-danger">Nível 1</span>
      case 'manager': return <span className="badge bg-warning">Nível 2</span>
      case 'user': return <span className="badge bg-info">Nível 3</span>
      default: return null
    }
  }

  return (
    <aside className="sidebar bg-dark text-light" style={{ 
      width: '280px', 
      minHeight: 'calc(100vh - 56px)',
      overflowY: 'auto'
    }}>
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
              <button 
                className="btn btn-sm btn-outline-light"
                onClick={logout}
                title="Sair do sistema"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Menu Principal */}
        {filteredMainMenu.length > 0 && (
          <div className="mb-4">
            <div className="sidebar-section-title d-flex justify-content-between align-items-center mb-2 px-2">
              <span className="text-uppercase small fw-bold opacity-75">Menu Principal</span>
            </div>
            <nav className="nav flex-column">
              {filteredMainMenu.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `sidebar-item nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ${
                      isActive ? 'bg-primary text-white' : 'text-light hover-bg'
                    }`
                  }
                >
                  <i className={`bi ${item.icon} me-3`} style={{ width: '20px' }}></i>
                  <span className="flex-grow-1">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Seção Financeira */}
        {filteredFinanceMenu.length > 0 && (
          <div className="mb-4">
            <div 
              className="sidebar-section-title d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
              onClick={() => toggleSection('financeira')}
            >
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-wallet2 me-2"></i>
                Financeira
              </span>
              <i className={`bi ${expandedSections.financeira ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            
            {expandedSections.financeira && (
              <nav className="nav flex-column">
                {filteredFinanceMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-item nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 ${
                        isActive ? 'bg-info text-white' : 'text-light hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`} style={{ width: '20px' }}></i>
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
            <div 
              className="sidebar-section-title d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
              onClick={() => toggleSection('operacional')}
            >
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-gear me-2"></i>
                Operacional
              </span>
              <i className={`bi ${expandedSections.operacional ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            
            {expandedSections.operacional && (
              <nav className="nav flex-column">
                {filteredOperationsMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}

                    
                    className={({ isActive }) =>
                      `sidebar-item nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 ${
                        isActive ? 'bg-success text-white' : 'text-light hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`} style={{ width: '20px' }}></i>
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
            <div 
              className="sidebar-section-title d-flex justify-content-between align-items-center mb-2 px-2 cursor-pointer"
              onClick={() => toggleSection('gestao')}
            >
              <span className="text-uppercase small fw-bold opacity-75">
                <i className="bi bi-clipboard-data me-2"></i>
                Gestão
              </span>
              <i className={`bi ${expandedSections.gestao ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </div>
            
            {expandedSections.gestao && (
              <nav className="nav flex-column">
                {filteredManagementMenu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-item nav-link py-2 px-3 rounded mb-1 d-flex align-items-center ps-4 ${
                        isActive ? 'bg-purple text-white' : 'text-light hover-bg'
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3`} style={{ width: '20px' }}></i>
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
            <small className="text-uppercase fw-bold">Status do Sistema</small>
            <span className="badge bg-success">
              <i className="bi bi-circle-fill me-1"></i>
              Online
            </span>
          </div>
          
          <div className="d-flex justify-content-between small mb-1">
            <span className="text-light opacity-75">Utilizador:</span>
            <span className="fw-bold">{user ? user.name : 'Não autenticado'}</span>
          </div>
          
          <div className="d-flex justify-content-between small">
            <span className="text-light opacity-75">Nível de acesso:</span>
            <span className="fw-bold">{getLevelBadge() || 'N/A'}</span>
          </div>
        </div>

      </div>
    </aside>
  )
}

export default Sidebar