// src/routes.jsx ou src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'

// Importar páginas
import Dashboard from './pages/Dashboard'
import Faturacao from './pages/Faturacao'
import Contabilidade from './pages/Contabilidade'
import Clientes from './pages/Clientes'
import Fornecedores from './pages/Fornecedores'
import Relatorios from './pages/Relatorios'
import Bancos from './pages/Bancos'
import Tesouraria from './pages/Tesouraria'
import IVAImpostos from './pages/IVAImpostos'
import FolhaPagamento from './pages/FolhaPagamento'

// Importar configurações
import ConfiguracoesPage from './components/configuracoes'
import ModulosConfigPage from './components/configuracoes/ModulosConfigPage'
import PlanoContasConfigPage from './components/configuracoes/PlanoContasConfigPage'
import SeriesDocumentosPage from './components/configuracoes/SeriesDocumentosPage'
import TiposPagamentoPage from './components/configuracoes/TiposPagamentoPage'
import TaxasIVAPage from './components/configuracoes/TaxasIVAPage'
import TerceirosIniciaisPage from './components/configuracoes/TerceirosIniciaisPage'

const AppRoutes = () => {
  const { hasPermission } = useAuth()

  // Componente de rota protegida
  const ProtectedRoute = ({ children, permission }) => {
    if (!hasPermission(permission)) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Routes>
      {/* Rotas principais */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/faturacao" element={
        <ProtectedRoute permission="Faturação">
          <Faturacao />
        </ProtectedRoute>
      } />
      <Route path="/contabilidade" element={
        <ProtectedRoute permission="Contabilidade">
          <Contabilidade />
        </ProtectedRoute>
      } />
      <Route path="/clientes" element={
        <ProtectedRoute permission="Clientes">
          <Clientes />
        </ProtectedRoute>
      } />
      <Route path="/fornecedores" element={
        <ProtectedRoute permission="Fornecedores">
          <Fornecedores />
        </ProtectedRoute>
      } />
      <Route path="/relatorios" element={
        <ProtectedRoute permission="Relatórios">
          <Relatorios />
        </ProtectedRoute>
      } />
      <Route path="/bancos" element={
        <ProtectedRoute permission="Bancos">
          <Bancos />
        </ProtectedRoute>
      } />
      <Route path="/tesouraria" element={
        <ProtectedRoute permission="Tesouraria">
          <Tesouraria />
        </ProtectedRoute>
      } />
      <Route path="/iva-impostos" element={
        <ProtectedRoute permission="IVA/Impostos">
          <IVAImpostos />
        </ProtectedRoute>
      } />
      <Route path="/folha-pagamento" element={
        <ProtectedRoute permission="Folha de Pagamento">
          <FolhaPagamento />
        </ProtectedRoute>
      } />

      {/* Rotas de Configurações */}
      <Route path="/configuracoes" element={
        <ProtectedRoute permission="Configurações">
          <ConfiguracoesPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/modulos" element={
        <ProtectedRoute permission="Configurações">
          <ModulosConfigPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/plano-contas" element={
        <ProtectedRoute permission="Configurações">
          <PlanoContasConfigPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/series" element={
        <ProtectedRoute permission="Configurações">
          <SeriesDocumentosPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/tipos-pagamento" element={
        <ProtectedRoute permission="Configurações">
          <TiposPagamentoPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/iva" element={
        <ProtectedRoute permission="Configurações">
          <TaxasIVAPage />
        </ProtectedRoute>
      } />
      <Route path="/configuracoes/terceiros" element={
        <ProtectedRoute permission="Configurações">
          <TerceirosIniciaisPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes