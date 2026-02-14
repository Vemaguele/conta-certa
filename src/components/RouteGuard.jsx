/**
 * RouteGuard.jsx - Protetor de Rotas
 * 
 * Redireciona para login se não autenticado
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RouteGuard = ({ children, requiredModule, requiredAction }) => {
  const { utilizador, loading, temPermissao } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!utilizador) {
    return <Navigate to="/login" replace />;
  }

  if (requiredModule && requiredAction) {
    if (!temPermissao(requiredModule, requiredAction)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-4">
              Não tem permissão para aceder a esta área.
            </p>
            <p className="text-sm text-gray-500">
              Nível atual: {utilizador.nivel}
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default RouteGuard;