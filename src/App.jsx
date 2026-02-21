import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Contabilidade from './pages/Contabilidade'

// Configurações
import ConfiguracoesPage from './components/configuracoes'
import ModulosConfig from './components/configuracoes/ModulosConfig'

// Placeholders para outras páginas
const PlaceholderPage = ({ title }) => (
  <div className="p-4">
    <h2>{title}</h2>
    <p className="text-muted">Página em desenvolvimento</p>
  </div>
)

function App() {
  const { user } = useAuth()

  if (!user) {
    return <div className="text-center p-5">A carregar...</div>
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1" style={{ marginLeft: '280px', width: 'calc(100% - 280px)' }}>
        <div className="bg-light min-vh-100 p-4">
          <Routes>
            {/* Principal */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Contabilidade */}
            <Route path="/contabilidade" element={<Contabilidade />} />
            <Route path="/contabilidade/plano-contas" element={<PlaceholderPage title="Plano de Contas" />} />
            
            {/* Configurações */}
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="/configuracoes/modulos" element={<ModulosConfig />} />
            
            {/* Placeholders para outras rotas */}
            <Route path="/faturacao" element={<PlaceholderPage title="Faturação" />} />
            <Route path="/clientes" element={<PlaceholderPage title="Clientes" />} />
            <Route path="/fornecedores" element={<PlaceholderPage title="Fornecedores" />} />
            <Route path="/relatorios" element={<PlaceholderPage title="Relatórios" />} />
            <Route path="/bancos" element={<PlaceholderPage title="Bancos" />} />
            <Route path="/tesouraria" element={<PlaceholderPage title="Tesouraria" />} />
            <Route path="/iva-impostos" element={<PlaceholderPage title="IVA/Impostos" />} />
            <Route path="/folha-pagamento" element={<PlaceholderPage title="Folha de Pagamento" />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App