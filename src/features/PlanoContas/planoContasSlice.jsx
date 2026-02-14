/**
 * planoContasSlice.js - Slice Redux para gestão do Plano de Contas
 * 
 * Gerencia o estado do plano de contas PGC-NIRF
 * Conforme Decreto 70/2009 de Moçambique
 * 
 * @module planoContasSlice
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { planoContasInicial } from './planoContasData';

// Estado inicial
const initialState = {
  contas: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  contaSelecionada: null,
  filtro: {
    classe: '',
    natureza: '',
    texto: ''
  }
};

// Async thunks para operações assíncronas
export const fetchContas = createAsyncThunk(
  'planoContas/fetchContas',
  async () => {
    // Tentar carregar do localStorage primeiro
    try {
      const saved = localStorage.getItem('planoContas');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Erro ao carregar do localStorage:', err);
    }
    // Se não houver dados guardados, usar dados iniciais
    return planoContasInicial;
  }
);

export const salvarConta = createAsyncThunk(
  'planoContas/salvarConta',
  async (conta) => {
    // Simulação de API - em produção, seria uma chamada real
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(conta);
      }, 300);
    });
  }
);

const planoContasSlice = createSlice({
  name: 'planoContas',
  initialState,
  reducers: {
    // Selecionar conta para edição
    setContaSelecionada: (state, action) => {
      state.contaSelecionada = action.payload;
    },
    
    // Filtros
    setFiltroClasse: (state, action) => {
      state.filtro.classe = action.payload;
    },
    
    setFiltroNatureza: (state, action) => {
      state.filtro.natureza = action.payload;
    },
    
    setFiltroTexto: (state, action) => {
      state.filtro.texto = action.payload;
    },
    
    // Operações CRUD
    adicionarConta: (state, action) => {
      const novaConta = {
        ...action.payload,
        id: Date.now(),
        dataCriacao: new Date().toISOString()
      };
      state.contas.push(novaConta);
      // Guardar no localStorage
      localStorage.setItem('planoContas', JSON.stringify(state.contas));
    },
    
    atualizarConta: (state, action) => {
      const index = state.contas.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contas[index] = {
          ...state.contas[index],
          ...action.payload,
          dataAtualizacao: new Date().toISOString()
        };
        // Guardar no localStorage
        localStorage.setItem('planoContas', JSON.stringify(state.contas));
      }
    },
    
    removerConta: (state, action) => {
      state.contas = state.contas.filter(c => c.id !== action.payload);
      // Guardar no localStorage
      localStorage.setItem('planoContas', JSON.stringify(state.contas));
    },
    
    // Restaurar plano padrão PGC-NIRF
    restaurarPadrao: (state) => {
      state.contas = planoContasInicial;
      localStorage.setItem('planoContas', JSON.stringify(planoContasInicial));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contas = action.payload;
      })
      .addCase(fetchContas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(salvarConta.fulfilled, (state, action) => {
        const index = state.contas.findIndex(c => c.codigo === action.payload.codigo);
        if (index === -1) {
          state.contas.push(action.payload);
        } else {
          state.contas[index] = action.payload;
        }
        localStorage.setItem('planoContas', JSON.stringify(state.contas));
      });
  }
});

// Exportar ações
export const { 
  setContaSelecionada, 
  setFiltroClasse, 
  setFiltroNatureza,
  setFiltroTexto,
  adicionarConta, 
  atualizarConta, 
  removerConta,
  restaurarPadrao 
} = planoContasSlice.actions;

// Selectors
export const selectTodasContas = (state) => state.planoContas.contas;
export const selectContaSelecionada = (state) => state.planoContas.contaSelecionada;
export const selectStatus = (state) => state.planoContas.status;
export const selectError = (state) => state.planoContas.error;
export const selectFiltro = (state) => state.planoContas.filtro;

// Selector com filtros aplicados
export const selectContasFiltradas = (state) => {
  const { contas, filtro } = state.planoContas;
  return contas.filter(conta => {
    const matchClasse = !filtro.classe || conta.classe === filtro.classe;
    const matchNatureza = !filtro.natureza || conta.natureza === filtro.natureza;
    const matchTexto = !filtro.texto || 
      conta.codigo.toLowerCase().includes(filtro.texto.toLowerCase()) ||
      conta.nome.toLowerCase().includes(filtro.texto.toLowerCase()) ||
      (conta.descricao && conta.descricao.toLowerCase().includes(filtro.texto.toLowerCase()));
    
    return matchClasse && matchNatureza && matchTexto;
  });
};

// Selector para contas por classe
export const selectContasPorClasse = (state) => {
  const contas = state.planoContas.contas;
  return {
    classe1: contas.filter(c => c.classe === '1'),
    classe2: contas.filter(c => c.classe === '2'),
    classe3: contas.filter(c => c.classe === '3'),
    classe4: contas.filter(c => c.classe === '4'),
    classe5: contas.filter(c => c.classe === '5'),
    classe6: contas.filter(c => c.classe === '6'),
    classe7: contas.filter(c => c.classe === '7'),
  };
};

export default planoContasSlice.reducer;