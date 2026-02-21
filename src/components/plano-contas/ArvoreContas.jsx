// frontend/src/components/plano-contas/ArvoreContas.jsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';
import contaService from '../../services/contaService';

const ContaNode = ({ conta, nivel = 0, onSelect }) => {
  const [expandido, setExpandido] = useState(false);
  const temFilhos = conta.filhos && conta.filhos.length > 0;
  
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpandido(!expandido);
  };
  
  const handleSelect = () => {
    if (onSelect) onSelect(conta);
  };
  
  const getIcon = () => {
    if (temFilhos) {
      return expandido ? 
        <ChevronDown className="w-4 h-4" /> : 
        <ChevronRight className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4 ml-4" />;
  };
  
  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer
          ${!conta.aceita_lancamentos ? 'font-semibold' : ''}`}
        style={{ paddingLeft: `${nivel * 20 + 8}px` }}
        onClick={handleSelect}
      >
        <span onClick={handleToggle} className="mr-1">
          {getIcon()}
        </span>
        <span className="text-gray-600 font-mono text-sm mr-2">
          {conta.codigo}
        </span>
        <span className="text-gray-800 flex-1">
          {conta.nome}
        </span>
        {!conta.ativo && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
            Inativa
          </span>
        )}
      </div>
      
      {expandido && temFilhos && (
        <div>
          {conta.filhos.map(filho => (
            <ContaNode
              key={filho.id}
              conta={filho}
              nivel={nivel + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ArvoreContas = ({ onSelectConta }) => {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    carregarContas();
  }, []);
  
  const carregarContas = async () => {
    try {
      setLoading(true);
      const response = await contaService.listar();
      setContas(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar plano de contas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  
  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-auto max-h-96">
      <div className="p-3 bg-gray-50 border-b font-medium">
        Plano de Contas
      </div>
      <div className="p-2">
        {contas.map(conta => (
          <ContaNode
            key={conta.id}
            conta={conta}
            onSelect={onSelectConta}
          />
        ))}
      </div>
    </div>
  );
};

export default ArvoreContas;