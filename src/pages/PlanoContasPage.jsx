/**
 * PlanoContasPage.jsx - Página do Plano de Contas
 * 
 * Integra com a autenticação e mantém todas as funcionalidades existentes
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import PlanoContasList from '../features/PlanoContas/PlanoContasList';
import ContaForm from '../features/PlanoContas/ContaForm';
import ResumoPlanoContas from '../features/PlanoContas/ResumoPlanoContas';
import { 
  selectContaSelecionada, 
  setContaSelecionada 
} from '../features/PlanoContas/planoContasSlice';
import { useAuth } from '../context/AuthContext';

const PlanoContasPage = () => {
  const dispatch = useDispatch();
  const contaSelecionada = useSelector(selectContaSelecionada);
  const [modoEdicao, setModoEdicao] = useState(false);
  const { temPermissao } = useAuth();

  const podeCriar = temPermissao('planoContas', 'criar');
  const podeEditar = temPermissao('planoContas', 'editar');

  const handleNovaConta = () => {
    dispatch(setContaSelecionada(null));
    setModoEdicao(true);
  };

  const handleCancelar = () => {
    setModoEdicao(false);
    dispatch(setContaSelecionada(null));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Plano de Contas PGC-NIRF</h1>
            <p className="text-gray-600">Decreto 70/2009 de Moçambique</p>
          </div>
          
          {podeCriar && (
            <button
              onClick={handleNovaConta}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              + Nova Conta
            </button>
          )}
        </div>

        <ResumoPlanoContas />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className={`${(contaSelecionada || modoEdicao) ? 'md:col-span-2' : 'md:col-span-3'}`}>
            <PlanoContasList />
          </div>

          {(contaSelecionada || modoEdicao) && podeEditar && (
            <div className="md:col-span-1">
              <ContaForm 
                conta={contaSelecionada}
                onCancel={handleCancelar}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanoContasPage;