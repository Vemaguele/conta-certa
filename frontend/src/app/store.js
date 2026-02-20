import { configureStore } from '@reduxjs/toolkit';
import planoContasReducer from '../features/planoContas/planoContasSlice';

export const store = configureStore({
  reducer: {
    planoContas: planoContasReducer,
  },
});