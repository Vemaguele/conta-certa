// src/auth/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'

// Definir níveis de acesso
export const UserRoles = {
  ADMIN: 'admin',        // Nível 1: Configura tudo
  MANAGER: 'manager',    // Nível 2: Gestão completa
  USER: 'user'           // Nível 3: Acesso básico
}

// Permissões por nível
const RolePermissions = {
  [UserRoles.ADMIN]: [
    // Todas as tags
    'Dashboard', 'Faturação', 'Contabilidade', 'Clientes', 'Fornecedores',
    'Relatórios', 'Bancos', 'Tesouraria', 'IVA/Impostos', 'Folha de Pagamento',
    'Stock Básico', 'Compras', 'Vendas & CRM', 'Imobilizado', 'Document Management',
    'E-faturação', 'Controlo de Gestão', 'Projetos', 'Mobile Access', 'Configurações'
  ],
  [UserRoles.MANAGER]: [
    // Todas exceto configurações avançadas
    'Dashboard', 'Faturação', 'Contabilidade', 'Clientes', 'Fornecedores',
    'Relatórios', 'Bancos', 'Tesouraria', 'IVA/Impostos', 'Folha de Pagamento',
    'Stock Básico', 'Compras', 'Vendas & CRM', 'Imobilizado', 'Document Management',
    'E-faturação', 'Controlo de Gestão', 'Projetos'
  ],
  [UserRoles.USER]: [
    // Apenas visualização básica
    'Dashboard', 'Faturação', 'Clientes', 'Vendas & CRM', 'Document Management'
  ]
}

// Usuários de exemplo (em produção viria da API)
const demoUsers = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Administrador', role: UserRoles.ADMIN },
  { id: 2, username: 'gestor', password: 'gestor123', name: 'Gestor Financeiro', role: UserRoles.MANAGER },
  { id: 3, username: 'user', password: 'user123', name: 'Utilizador Básico', role: UserRoles.USER }
]

// Criar contexto
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('contabilidade_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = demoUsers.find(
          u => u.username === username && u.password === password
        )
        
        if (foundUser) {
          // Remover senha antes de salvar
          const { password: _, ...userWithoutPassword } = foundUser
          const userData = {
            ...userWithoutPassword,
            permissions: RolePermissions[foundUser.role]
          }
          
          setUser(userData)
          localStorage.setItem('contabilidade_user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject('Credenciais inválidas')
        }
      }, 500) // Simula delay de API
    })
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('contabilidade_user')
  }

  // Verificar permissão
  const hasPermission = (permission) => {
    if (!user) return false
    return user.permissions?.includes(permission)
  }

  // Obter nível do usuário
  const getUserLevel = () => {
    if (!user) return 0
    switch(user.role) {
      case UserRoles.ADMIN: return 1
      case UserRoles.MANAGER: return 2
      case UserRoles.USER: return 3
      default: return 0
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    getUserLevel,
    isAdmin: user?.role === UserRoles.ADMIN,
    isManager: user?.role === UserRoles.MANAGER,
    isUser: user?.role === UserRoles.USER
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}