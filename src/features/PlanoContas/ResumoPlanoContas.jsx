/**
 * ResumoPlanoContas.jsx - Componente de Resumo Estatístico do Plano de Contas
 * 
 * Exibe cards com estatísticas por classe contabilística (1 a 5)
 * Conforme PGC-NIRF do Decreto 70/2009 de Moçambique
 * 
 * @module ResumoPlanoContas
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Paper, 
  Grid, 
  Typography, 
  Box, 
  LinearProgress, 
  Chip, 
  Stack 
} from '@mui/material';
import {
  AccountBalance as AtivosIcon,
  AccountBalanceWallet as PassivosIcon,
  People as CapitalIcon,
  TrendingUp as RendimentosIcon,
  TrendingDown as GastosIcon
} from '@mui/icons-material';
import { selectContasPorClasse } from './planoContasSlice';

/**
 * Componente de resumo estatístico do plano de contas
 * Mostra cards com contagem e percentagem por classe
 * 
 * @returns {JSX.Element} Cards de estatísticas
 */
const ResumoPlanoContas = () => {
  const contasPorClasse = useSelector(selectContasPorClasse);
  
  // Estatísticas por classe com cores e ícones
  const estatisticas = [
    {
      classe: '1',
      nome: 'Ativos',
      icon: <AtivosIcon />,
      contas: contasPorClasse.classe1?.length || 0,
      cor: '#2196f3',
      descricao: 'Art. 47-56 - Recursos controlados'
    },
    {
      classe: '2',
      nome: 'Passivos',
      icon: <PassivosIcon />,
      contas: contasPorClasse.classe2?.length || 0,
      cor: '#f44336',
      descricao: 'Art. 57-62 - Obrigações presentes'
    },
    {
      classe: '3',
      nome: 'Capital Próprio',
      icon: <CapitalIcon />,
      contas: contasPorClasse.classe3?.length || 0,
      cor: '#4caf50',
      descricao: 'Art. 63-66 - Interesse residual'
    },
    {
      classe: '4',
      nome: 'Rendimentos',
      icon: <RendimentosIcon />,
      contas: contasPorClasse.classe4?.length || 0,
      cor: '#ff9800',
      descricao: 'Art. 72-75 - Aumentos de benefícios'
    },
    {
      classe: '5',
      nome: 'Gastos',
      icon: <GastosIcon />,
      contas: contasPorClasse.classe5?.length || 0,
      cor: '#9c27b0',
      descricao: 'Art. 76-78 - Reduções de benefícios'
    }
  ];
  
  // Total de contas para cálculo de percentagens
  const totalContas = Object.values(contasPorClasse).reduce(
    (total, arr) => total + (arr?.length || 0), 0
  );
  
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resumo do Plano de Contas PGC-NIRF
      </Typography>
      
      <Grid container spacing={2}>
        {estatisticas.map((estat) => (
          <Grid item xs={12} sm={6} md={2.4} key={estat.classe}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderLeft: `4px solid ${estat.cor}`,
                backgroundColor: `${estat.cor}10`,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box sx={{ color: estat.cor }}>
                  {estat.icon}
                </Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  Classe {estat.classe} - {estat.nome}
                </Typography>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                {estat.contas}
              </Typography>
              
              <Typography variant="caption" color="textSecondary" display="block" sx={{ mb: 1 }}>
                {estat.descricao}
              </Typography>
              
              <LinearProgress
                variant="determinate"
                value={totalContas > 0 ? (estat.contas / totalContas) * 100 : 0}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: `${estat.cor}30`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: estat.cor,
                    borderRadius: 3
                  }
                }}
              />
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                {totalContas > 0 
                  ? `${((estat.contas / totalContas) * 100).toFixed(1)}% do total`
                  : '0% do total'
                }
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Stack direction="row" spacing={1} mt={3} flexWrap="wrap" useFlexGap>
        <Chip
          label={`Total: ${totalContas} contas`}
          color="primary"
          variant="outlined"
          size="small"
        />
        <Chip
          label={`Ativos: ${contasPorClasse.classe1?.length || 0}`}
          sx={{ backgroundColor: '#e3f2fd' }}
          size="small"
        />
        <Chip
          label={`Passivos: ${contasPorClasse.classe2?.length || 0}`}
          sx={{ backgroundColor: '#ffebee' }}
          size="small"
        />
        <Chip
          label={`Capital: ${contasPorClasse.classe3?.length || 0}`}
          sx={{ backgroundColor: '#e8f5e9' }}
          size="small"
        />
        <Chip
          label={`Rendimentos: ${contasPorClasse.classe4?.length || 0}`}
          sx={{ backgroundColor: '#fff3e0' }}
          size="small"
        />
        <Chip
          label={`Gastos: ${contasPorClasse.classe5?.length || 0}`}
          sx={{ backgroundColor: '#f3e5f5' }}
          size="small"
        />
        <Chip
          label="PGC-NIRF Moçambique"
          color="secondary"
          size="small"
          variant="outlined"
        />
        <Chip
          label="Decreto 70/2009"
          size="small"
          variant="outlined"
        />
      </Stack>
    </Paper>
  );
};

export default ResumoPlanoContas;