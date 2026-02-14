/**
 * LoginPage.jsx - Página de Login
 * 
 * Integra-se com a estrutura existente do projeto
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, senha);
    
    if (result.success) {
      navigate('/');
    } else {
      setErro(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Conta-Certa</h1>
          <p className="text-gray-600 text-sm">Sistema de Contabilidade</p>
          <p className="text-xs text-gray-500 mt-1">Decreto 70/2009 • Moçambique</p>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-bold mb-2">Credenciais de teste:</p>
          <p>👑 Admin: admin@contacerta.co.mz / admin123</p>
          <p>📊 Contabilista: contabilista@contacerta.co.mz / contab123</p>
          <p>👁️ Visualizador: visualizador@contacerta.co.mz / visual123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;