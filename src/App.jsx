/**
 * App.jsx - Componente Principal
 * 
 * Mantém a estrutura do projeto e adiciona autenticação
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RouteGuard from './components/RouteGuard';
import LoginPage from './pages/LoginPage';
import PlanoContasPage from './pages/PlanoContasPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Rota pública */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Rotas protegidas */}
              <Route path="/" element={
                <RouteGuard requiredModule="planoContas" requiredAction="ver">
                  <PlanoContasPage />
                </RouteGuard>
              } />
              
              <Route path="/lancamentos" element={
                <RouteGuard requiredModule="lancamentos" requiredAction="ver">
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Módulo de Lançamentos</h1>
                    <p className="text-gray-600">Em desenvolvimento conforme NCRF 1</p>
                  </div>
                </RouteGuard>
              } />
              
              <Route path="/terceiros" element={
                <RouteGuard requiredModule="terceiros" requiredAction="ver">
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Cadastro de Terceiros</h1>
                    <p className="text-gray-600">Em desenvolvimento</p>
                  </div>
                </RouteGuard>
              } />
              
              <Route path="/documentos" element={
                <RouteGuard requiredModule="documentos" requiredAction="ver">
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Séries de Documentos</h1>
                    <p className="text-gray-600">Em desenvolvimento</p>
                  </div>
                </RouteGuard>
              } />
              
              <Route path="/relatorios" element={
                <RouteGuard requiredModule="relatorios" requiredAction="ver">
                  <div className="p-8 text-center">
                    <h1 className="text-2xl font-bold mb-4">Relatórios Financeiros</h1>
                    <p className="text-gray-600">Em desenvolvimento</p>
                  </div>
                </RouteGuard>
              } />
              
              {/* Redirecionamento padrão */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;