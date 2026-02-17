import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { planoContasInicial } from './planoContasData';

// Estado inicial baseado no PGC-NIRF
const initialState = {
  contas: planoContasInicial,
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
    // Simulação de API - depois substituir por chamada real
    const response = await new Promise(resolve => 
      setTimeout(() => resolve(planoContasInicial), 500)
    );
    return response;
  }
);

export const salvarConta = createAsyncThunk(
  'planoContas/salvarConta',
  async (conta) => {
    // Simulação de API
    const response = await new Promise(resolve => 
      setTimeout(() => resolve({...conta, id: Date.now()}), 300)
    );
    return response;
  }
);

const planoContasSlice = createSlice({
  name: 'planoContas',
  initialState,
  reducers: {
    // Ações síncronas
    setContaSelecionada: (state, action) => {
      state.contaSelecionada = action.payload;
    },
    
    setFiltroClasse: (state, action) => {
      state.filtro.classe = action.payload;
    },
    
    setFiltroTexto: (state, action) => {
      state.filtro.texto = action.payload;
    },
    
    adicionarConta: (state, action) => {
      const novaConta = {
        ...action.payload,
        id: Date.now(),
        dataCriacao: new Date().toISOString()
      };
      state.contas.push(novaConta);
    },
    
    atualizarConta: (state, action) => {
      const index = state.contas.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contas[index] = {
          ...state.contas[index],
          ...action.payload,
          dataAtualizacao: new Date().toISOString()
        };
      }
    },
    
    removerConta: (state, action) => {
      state.contas = state.contas.filter(c => c.id !== action.payload);
    },
    
    // Restaurar plano padrão PGC-NIRF
    restaurarPadrao: (state) => {
      state.contas = planoContasInicial;
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
      });
  }
});

// Exportar ações e reducer
export const { 
  setContaSelecionada, 
  setFiltroClasse, 
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
export const selectFiltro = (state) => state.planoContas.filtro;
export const selectContasFiltradas = (state) => {
  const { contas, filtro } = state.planoContas;
  return contas.filter(conta => {
    const matchClasse = !filtro.classe || conta.classe === filtro.classe;
    const matchNatureza = !filtro.natureza || conta.natureza === filtro.natureza;
    const matchTexto = !filtro.texto || 
      conta.codigo.toLowerCase().includes(filtro.texto.toLowerCase()) ||
      conta.nome.toLowerCase().includes(filtro.texto.toLowerCase()) ||
      conta.descricao.toLowerCase().includes(filtro.texto.toLowerCase());
    
    return matchClasse && matchNatureza && matchTexto;
  });
};

// Exportar por classe conforme PGC-NIRF
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