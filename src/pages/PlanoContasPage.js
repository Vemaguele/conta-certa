import React, { useState } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import PlanoContasList from '../features/PlanoContas/PlanoContasList';
import ContaForm from '../features/PlanoContas/ContaForm';
import ResumoPlanoContas from '../features/PlanoContas/ResumoPlanoContas';
import { useSelector } from 'react-redux';
import { selectContaSelecionada } from '../features/PlanoContas/planoContasSlice';

const PlanoContasPage = () => {
  const contaSelecionada = useSelector(selectContaSelecionada);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sistema Contabilístico PGC-NIRF
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Decreto 70/2009 de Moçambique • Plano Geral de Contabilidade
        </Typography>
      </Box>
      
      <ResumoPlanoContas />
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={contaSelecionada || modoEdicao ? 7 : 12}>
          <PlanoContasList />
        </Grid>
        
        {(contaSelecionada || modoEdicao) && (
          <Grid item xs={12} md={5}>
            <ContaForm
              conta={contaSelecionada}
              onCancel={() => {
                setModoEdicao(false);
                // Dispatch para limpar conta selecionada
              }}
            />
            
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                <strong>Nota:</strong> O código segue estrutura PGC-NIRF:<br/>
                • 1º dígito: Classe (1-7)<br/>
                • 2º dígito: Subclasse<br/>
                • 3º dígito: Conta analítica
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {!contaSelecionada && !modoEdicao && (
        <Box mt={3} display="flex" justifyContent="flex-end">
          <button 
            onClick={() => setModoEdicao(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + Adicionar Nova Conta
          </button>
        </Box>
      )}
    </Container>
  );
};

export default PlanoContasPage;