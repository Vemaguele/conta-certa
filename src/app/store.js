import { configureStore } from '@reduxjs/toolkit';
import planoContasReducer from '../features/PlanoContas/planoContasSlice';

export const store = configureStore({
  reducer: {
    planoContas: planoContasReducer,
  },
});