// frontend/src/pages/parametros/ParametrosPage.jsx
import React, { useState, useEffect } from 'react';
import parametroService from '../../services/parametroService';
import { Save, RefreshCw } from 'lucide-react';

const ParametrosPage = () => {
  const [parametros, setParametros] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Parâmetros padrão
  const parametrosPadrao = [
    { chave: 'MOEDA_PADRAO', valor: 'MTN', tipo: 'texto', descricao: 'Moeda principal do sistema' },
    { chave: 'FORMATO_DATA', valor: 'DD/MM/YYYY', tipo: 'texto', descricao: 'Formato de data padrão' },
    { chave: 'CONTROLE_ESTOQUE', valor: 'true', tipo: 'booleano', descricao: 'Ativar controle de estoque' },
    { chave: 'PERMITIR_LANCAMENTOS_PERIODOS_ANTERIORES', valor: 'false', tipo: 'booleano', descricao: 'Permitir lançamentos em períodos já encerrados' }
  ];
  
  useEffect(() => {
    carregarParametros();
  }, []);
  
  const carregarParametros = async () => {
    try {
      setLoading(true);
      const response = await parametroService.listar();
      
      // Converter array para objeto por chave
      const paramsObj = {};
      response.data.forEach(p => {
        paramsObj[p.chave] = p;
      });
      
      setParametros(paramsObj);
      setMessage(null);
    } catch (error) {
      console.error('Erro ao carregar parâmetros:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar parâmetros' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (chave, valor) => {
    setParametros(prev => ({
      ...prev,
      [chave]: { ...prev[chave], valor }
    }));
  };
  
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Salvar cada parâmetro modificado
      for (const chave in parametros) {
        const param = parametros[chave];
        if (param.id) {
          await parametroService.atualizar(param.id, { valor: param.valor });
        } else {
          await parametroService.criar({
            chave: param.chave,
            valor: param.valor,
            tipo: param.tipo,
            descricao: param.descricao
          });
        }
      }
      
      setMessage({ type: 'success', text: 'Parâmetros salvos com sucesso' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar parâmetros:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar parâmetros' });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Parâmetros do Sistema</h1>
        <p className="text-gray-600">Configure as opções gerais do sistema contábil</p>
      </div>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-4">
          {parametrosPadrao.map(param => (
            <div key={param.chave} className="flex items-center border-b pb-4 last:border-0">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {param.chave}
                </label>
                <p className="text-xs text-gray-500 mb-2">{param.descricao}</p>
                
                {param.tipo === 'booleano' ? (
                  <select
                    value={parametros[param.chave]?.valor || param.valor}
                    onChange={(e) => handleChange(param.chave, e.target.value)}
                    className="w-48 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={parametros[param.chave]?.valor || param.valor}
                    onChange={(e) => handleChange(param.chave, e.target.value)}
                    className="w-64 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParametrosPage;