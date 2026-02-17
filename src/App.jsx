import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import ProtectedRoute from './auth/ProtectedRoute';
import LoginPage from './auth/LoginPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Importe as páginas principais
import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import AccountingPage from './pages/AccountingPage';
import ClientsPage from './pages/ClientsPage';
import SuppliersPage from './pages/SuppliersPage';
import ConfiguracoesSistema from './pages/ConfiguracoesSistema';
import AdminPage from './pages/AdminPage';
import PerfilPage from './pages/PerfilPage';

// Layout padrão para páginas protegidas
const ProtectedLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <main className="main-content flex-grow-1 overflow-auto">
          <div className="container-fluid py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componente principal das rotas
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública - Login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Rota raiz - Redireciona para dashboard se autenticado */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" replace />
        </ProtectedRoute>
      } />
      
      {/* ROTAS PRINCIPAIS */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <DashboardPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/faturacao" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <InvoicesPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/contabilidade" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <AccountingPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/clientes" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <ClientsPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/fornecedores" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <SuppliersPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <ConfiguracoesSistema />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute requiredLevel={1}>
          <ProtectedLayout>
            <AdminPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/perfil" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <PerfilPage />
          </ProtectedLayout>
        </ProtectedRoute>
      } />
      
      {/* Rota 404 - Página não encontrada */}
      <Route path="*" element={
        <ProtectedRoute>
          <ProtectedLayout>
            <div className="text-center py-5">
              <h1 className="display-1 text-muted">404</h1>
              <h3 className="mb-3">Página não encontrada</h3>
              <p className="text-muted mb-4">
                A página que procura não existe ou foi movida.
              </p>
              <a href="/" className="btn btn-primary">
                <i className="bi bi-house me-1"></i> Voltar ao Dashboard
              </a>
            </div>
          </ProtectedLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

// App principal
function App() {
  return (
    <Router>
      <AuthProvider>
        <ConfigProvider>
          <AppRoutes />
        </ConfigProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;