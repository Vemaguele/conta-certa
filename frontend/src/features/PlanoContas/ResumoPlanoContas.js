import React from 'react';
import { useSelector } from 'react-redux';
import { selectContasPorClasse } from './features/planoContas/planoContasSlice';

import {
  Paper, Grid, Typography, Box,
  LinearProgress, Chip, Stack
} from '@mui/material';
import {
  AccountBalance as AtivosIcon,
  AccountBalanceWallet as PassivosIcon,
  People as CapitalIcon,
  TrendingUp as RendimentosIcon,
  TrendingDown as GastosIcon
} from '@mui/icons-material';

const ResumoPlanoContas = () => {
  const contasPorClasse = useSelector(selectContasPorClasse);
  
  const estatisticas = [
    {
      classe: '1',
      nome: 'Ativos',
      icon: <AtivosIcon />,
      contas: contasPorClasse.classe1.length,
      cor: '#2196f3'
    },
    {
      classe: '2',
      nome: 'Passivos',
      icon: <PassivosIcon />,
      contas: contasPorClasse.classe2.length,
      cor: '#f44336'
    },
    {
      classe: '3',
      nome: 'Capital',
      icon: <CapitalIcon />,
      contas: contasPorClasse.classe3.length,
      cor: '#4caf50'
    },
    {
      classe: '4',
      nome: 'Rendimentos',
      icon: <RendimentosIcon />,
      contas: contasPorClasse.classe4.length,
      cor: '#ff9800'
    },
    {
      classe: '5',
      nome: 'Gastos',
      icon: <GastosIcon />,
      contas: contasPorClasse.classe5.length,
      cor: '#9c27b0'
    }
  ];
  
  const totalContas = Object.values(contasPorClasse).reduce(
    (total, arr) => total + arr.length, 0
  );
  
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Resumo do Plano de Contas
      </Typography>
      
      <Grid container spacing={2}>
        {estatisticas.map((estat) => (
          <Grid item xs={12} sm={6} md={2.4} key={estat.classe}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderLeft: `4px solid ${estat.cor}`,
                backgroundColor: `${estat.cor}10`
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box sx={{ color: estat.cor }}>
                  {estat.icon}
                </Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {estat.nome}
                </Typography>
              </Box>
              
              <Typography variant="h5" fontWeight="bold">
                {estat.contas}
              </Typography>
              
              <Typography variant="caption" color="textSecondary">
                {totalContas > 0 
                  ? `${((estat.contas / totalContas) * 100).toFixed(1)}% do total`
                  : '0%'
                }
              </Typography>
              
              <LinearProgress
                variant="determinate"
                value={totalContas > 0 ? (estat.contas / totalContas) * 100 : 0}
                sx={{
                  mt: 1,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: `${estat.cor}30`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: estat.cor
                  }
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
        <Chip
          label={`Total: ${totalContas} contas`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`Ativos: ${contasPorClasse.classe1.length}`}
          sx={{ backgroundColor: '#e3f2fd' }}
        />
        <Chip
          label={`Passivos: ${contasPorClasse.classe2.length}`}
          sx={{ backgroundColor: '#ffebee' }}
        />
        <Chip
          label={`Capital: ${contasPorClasse.classe3.length}`}
          sx={{ backgroundColor: '#e8f5e9' }}
        />
        <Chip
          label="Conforme PGC-NIRF"
          color="success"
          size="small"
        />
      </Stack>
    </Paper>
  );
};

export default ResumoPlanoContas;