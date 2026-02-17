
/**
 * ConfiguracoesPage.jsx - Página de Configurações Original
 * 
 * Restaurada conforme design do repositório conta-certa
 */

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const ConfiguracoesPage = () => {
  const { utilizador } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState('empresa');

  const abas = [
    { id: 'empresa', nome: 'Empresa', icon: '🏢' },
    { id: 'utilizadores', nome: 'Utilizadores', icon: '👥' },
    { id: 'sistema', nome: 'Sistema', icon: '⚙️' },
    { id: 'seguranca', nome: 'Segurança', icon: '🔒' },
    { id: 'backup', nome: 'Backup', icon: '💾' },
  ];

  return (
    <div className="flex">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
          <p className="text-gray-600">Gerir parâmetros do sistema</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {abas.map((aba) => (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtiva(aba.id)}
                  className={`
                    px-6 py-3 text-sm font-medium border-b-2 flex items-center space-x-2
                    ${abaAtiva === aba.id 
                      ? 'border-green-700 text-green-700' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span>{aba.icon}</span>
                  <span>{aba.nome}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo das abas */}
          <div className="p-6">
            {abaAtiva === 'empresa' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Dados da Empresa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="Conta-Certa, Lda"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIF
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="Av. 24 de Julho, Maputo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="+258 84 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="geral@contacerta.co.mz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                      defaultValue="www.contacerta.co.mz"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                    Guardar Alterações
                  </button>
                </div>
              </div>
            )}

            {abaAtiva === 'utilizadores' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestão de Utilizadores</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Lista de Utilizadores</h4>
                    <button className="bg-green-700 text-white px-3 py-1 rounded text-sm hover:bg-green-800">
                      + Novo Utilizador
                    </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2">Administrador</td>
                        <td className="px-4 py-2">admin@contacerta.co.mz</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Admin</span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
                          <button className="text-red-600 hover:text-red-800">🗑️</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Maria Silva</td>
                        <td className="px-4 py-2">maria@contacerta.co.mz</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Contabilista</span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
                          <button className="text-red-600 hover:text-red-800">🗑️</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {abaAtiva === 'sistema' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Configurações do Sistema</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Modo de Desenvolvimento</p>
                      <p className="text-sm text-gray-500">Ativar para testes e debugging</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Logs de Auditoria</p>
                      <p className="text-sm text-gray-500">Registar todas as ações no sistema</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Backup Automático</p>
                      <p className="text-sm text-gray-500">Realizar backup diário às 23:00</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'seguranca' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Segurança</h3>
                <p className="text-gray-600">Configurações de segurança em desenvolvimento</p>
              </div>
            )}

            {abaAtiva === 'backup' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Backup</h3>
                <p className="text-gray-600">Configurações de backup em desenvolvimento</p>
              </div>
            )}
          </div>
        </div>

        {/* Informação do Sistema */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Informação do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Versão</p>
              <p className="font-medium">1.0.0</p>
            </div>
            <div>
              <p className="text-gray-600">Norma</p>
              <p className="font-medium">PGC-NIRF (Decreto 70/2009)</p>
            </div>
            <div>
              <p className="text-gray-600">Ambiente</p>
              <p className="font-medium">Desenvolvimento</p>
            </div>
            <div>
              <p className="text-gray-600">Último Backup</p>
              <p className="font-medium">14/02/2026 23:00</p>
            </div>
            <div>
              <p className="text-gray-600">Total de Utilizadores</p>
              <p className="font-medium">3</p>
            </div>
            <div>
              <p className="text-gray-600">Empresa</p>
              <p className="font-medium">Conta-Certa, Lda</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracoesPage;
