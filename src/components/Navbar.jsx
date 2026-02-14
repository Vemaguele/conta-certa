/**
 * Navbar.jsx - Barra de Navegação com Controlo de Acesso
 * 
 * Mantém o estilo do projeto mas adiciona controlo por nível
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { utilizador, logout, temPermissao } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cores por nível
  const nivelCores = {
    admin: 'bg-green-700',
    contabilista: 'bg-red-700',
    visualizador: 'bg-orange-500'
  };

  const nivelNomes = {
    admin: 'Administrador',
    contabilista: 'Contabilista',
    visualizador: 'Visualizador'
  };

  if (!utilizador) return null;

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">
            Conta-Certa
          </Link>

          {/* Menu de navegação */}
          <div className="hidden md:flex space-x-4">
            {temPermissao('planoContas', 'ver') && (
              <Link to="/" className="hover:bg-green-600 px-3 py-2 rounded">
                Plano de Contas
              </Link>
            )}
            
            {temPermissao('lancamentos', 'ver') && (
              <Link to="/lancamentos" className="hover:bg-green-600 px-3 py-2 rounded">
                Lançamentos
              </Link>
            )}
            
            {temPermissao('terceiros', 'ver') && (
              <Link to="/terceiros" className="hover:bg-green-600 px-3 py-2 rounded">
                Terceiros
              </Link>
            )}
            
            {temPermissao('documentos', 'ver') && (
              <Link to="/documentos" className="hover:bg-green-600 px-3 py-2 rounded">
                Documentos
              </Link>
            )}
            
            {temPermissao('relatorios', 'ver') && (
              <Link to="/relatorios" className="hover:bg-green-600 px-3 py-2 rounded">
                Relatórios
              </Link>
            )}
          </div>

          {/* Informação do utilizador */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium">{utilizador.nome}</div>
              <div className="text-xs opacity-75">{nivelNomes[utilizador.nivel]}</div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${nivelCores[utilizador.nivel]}`}>
              {utilizador.nome.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="bg-green-800 hover:bg-green-900 px-3 py-1 rounded text-sm transition"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;