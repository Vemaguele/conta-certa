/**
 * AuthContext.jsx - Contexto de Autenticação e Autorização
 * 
 * Mantendo a estrutura do projeto, adiciona 3 níveis de acesso:
 * - admin: Acesso total
 * - contabilista: Operações contabilísticas
 * - visualizador: Apenas consulta
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

// Dados iniciais dos utilizadores (mantendo no contexto para simplicidade)
const UTILIZADORES = [
  {
    id: 1,
    nome: 'Administrador',
    email: 'admin@contacerta.co.mz',
    senha: 'admin123', // Em produção, usar bcrypt
    nivel: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=006B3F&color=fff'
  },
  {
    id: 2,
    nome: 'Maria Silva',
    email: 'contabilista@contacerta.co.mz',
    senha: 'contab123',
    nivel: 'contabilista',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Silva&background=C8102E&color=fff'
  },
  {
    id: 3,
    nome: 'João Santos',
    email: 'visualizador@contacerta.co.mz',
    senha: 'visual123',
    nivel: 'visualizador',
    avatar: 'https://ui-avatars.com/api/?name=Joao+Santos&background=FF9800&color=fff'
  }
];

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [utilizador, setUtilizador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão ao iniciar
    const savedUser = localStorage.getItem('utilizador');
    if (savedUser) {
      setUtilizador(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, senha) => {
    const user = UTILIZADORES.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      const { senha, ...userSemSenha } = user;
      setUtilizador(userSemSenha);
      localStorage.setItem('utilizador', JSON.stringify(userSemSenha));
      return { success: true, user: userSemSenha };
    }
    
    return { success: false, error: 'Email ou senha incorretos' };
  };

  const logout = () => {
    setUtilizador(null);
    localStorage.removeItem('utilizador');
  };

  const temPermissao = (modulo, acao) => {
    if (!utilizador) return false;
    if (utilizador.nivel === 'admin') return true;
    
    const permissoes = {
      contabilista: {
        planoContas: ['ver', 'criar', 'editar'],
        lancamentos: ['ver', 'criar', 'editar'],
        terceiros: ['ver', 'criar', 'editar'],
        documentos: ['ver', 'criar'],
        relatorios: ['ver']
      },
      visualizador: {
        planoContas: ['ver'],
        lancamentos: ['ver'],
        terceiros: ['ver'],
        documentos: ['ver'],
        relatorios: ['ver']
      }
    };

    const userPerms = permissoes[utilizador.nivel] || {};
    return userPerms[modulo]?.includes(acao) || false;
  };

  const value = {
    utilizador,
    loading,
    login,
    logout,
    temPermissao
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;