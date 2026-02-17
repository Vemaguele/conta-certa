// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiSettings, FiUsers, FiDollarSign,
  FiFileText, FiBookOpen, FiLogOut,
  FiChevronDown, FiChevronUp, FiUser
} from 'react-icons/fi';

// Hook de autenticação (assumindo que existe no projeto)
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Definição dos menus com níveis de acesso
  const menuItems = [
    {
      title: 'Dashboard',
      icon: FiHome,
      path: '/',
      permissions: ['view_dashboard'], // Permissão específica
    },
    {
      title: 'Contabilidade',
      icon: FiBookOpen,
      permissions: ['view_contabilidade'],
      submenu: [
        { 
          title: 'Plano de Contas', 
          path: '/contabilidade/plano-contas',
          permissions: ['view_plano_contas'] 
        },
        { 
          title: 'Lançamentos', 
          path: '/contabilidade/lancamentos',
          permissions: ['view_lancamentos'] 
        },
        { 
          title: 'Diários', 
          path: '/contabilidade/diarios',
          permissions: ['view_diarios'] 
        },
        { 
          title: 'Balancete', 
          path: '/contabilidade/balancete',
          permissions: ['view_balancete'] 
        },
        { 
          title: 'Reconciliação Bancária', 
          path: '/contabilidade/reconciliacao',
          permissions: ['view_reconciliacao'] 
        },
        { 
          title: 'Encerramento de Período', 
          path: '/contabilidade/encerramento',
          permissions: ['view_encerramento'] 
        },
      ],
    },
    {
      title: 'Terceiros',
      icon: FiUsers,
      permissions: ['view_terceiros'],
      submenu: [
        { 
          title: 'Clientes', 
          path: '/terceiros/clientes',
          permissions: ['view_clientes'] 
        },
        { 
          title: 'Fornecedores', 
          path: '/terceiros/fornecedores',
          permissions: ['view_fornecedores'] 
        },
      ],
    },
    {
      title: 'Parâmetros',
      icon: FiSettings,
      permissions: ['view_parametros'],
      submenu: [
        { 
          title: 'Séries de Documentos', 
          path: '/parametros/series-documentos',
          permissions: ['view_series'] 
        },
        { 
          title: 'Meios de Pagamento', 
          path: '/parametros/meios-pagamento',
          permissions: ['view_meios_pagamento'] 
        },
        { 
          title: 'Contas Padrão', 
          path: '/parametros/contas-padrao',
          permissions: ['view_contas_padrao'] 
        },
      ],
    },
  ];

  // Função para verificar se o usuário tem acesso a um item
  const canAccess = (item) => {
    // Se não tem permissões definidas, qualquer um pode acessar
    if (!item.permissions) return true;
    // Verifica se o usuário tem pelo menos uma das permissões necessárias
    return item.permissions.some(perm => hasPermission(perm));
  };

  // Função para filtrar menus baseado em permissões
  const filterMenuByPermissions = (items) => {
    return items.filter(item => {
      // Verifica permissão do item principal
      if (!canAccess(item)) return false;
      
      // Se tem submenu, filtra os subitens
      if (item.submenu) {
        item.submenu = item.submenu.filter(sub => canAccess(sub));
        return item.submenu.length > 0;
      }
      
      return true;
    });
  };

  const filteredMenu = filterMenuByPermissions(menuItems);

  return (
    <div className="h-screen bg-gray-900 text-white w-64 fixed left-0 top-0 overflow-y-auto flex flex-col">
      {/* Logo e título */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Conta-Certa</h1>
        <p className="text-xs text-gray-400">Sistema Contabilístico</p>
      </div>
      
      {/* Informações do usuário logado */}
      <div className="p-4 border-b border-gray-800 bg-gray-800">
        <div className="flex items-center">
          <div className="bg-blue-600 p-2 rounded-full mr-3">
            <FiUser size={16} />
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium truncate">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || 'email@exemplo.com'}</p>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <nav className="flex-1 p-4">
        {filteredMenu.map((item, index) => (
          <div key={index} className="mb-2">
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3" size={18} />
                    <span>{item.title}</span>
                  </div>
                  {openMenus[item.title] ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                
                {openMenus[item.title] && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.submenu.map((sub, idx) => (
                      <NavLink
                        key={idx}
                        to={sub.path}
                        className={({ isActive }) =>
                          `block p-2 text-sm rounded transition-colors ${
                            isActive 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-800'
                          }`
                        }
                      >
                        {sub.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="mr-3" size={18} />
                <span>{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Botão de logout no rodapé */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded transition-colors"
        >
          <FiLogOut className="mr-3" size={18} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;