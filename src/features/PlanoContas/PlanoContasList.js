import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContas,
  setContaSelecionada,
  setFiltroClasse,
  setFiltroTexto,
  selectContasFiltradas,
  selectStatus,
  selectFiltro
} from './planoContasSlice';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress,
  TextField, Select, MenuItem, FormControl,
  InputLabel, Box, Typography, Chip
} from '@mui/material';

const PlanoContasList = () => {
  const dispatch = useDispatch();
  const contas = useSelector(selectContasFiltradas);
  const status = useSelector(selectStatus);
  const filtro = useSelector(selectFiltro);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContas());
    }
  }, [status, dispatch]);
  
  const handleClasseChange = (event) => {
    dispatch(setFiltroClasse(event.target.value));
  };
  
  const handleTextoChange = (event) => {
    dispatch(setFiltroTexto(event.target.value));
  };
  
  const handleSelectConta = (conta) => {
    dispatch(setContaSelecionada(conta));
  };
  
  const getNaturezaColor = (natureza) => {
    return natureza === 'D' ? 'error' : natureza === 'C' ? 'success' : 'warning';
  };
  
  const getClasseColor = (classe) => {
    const colors = {
      '1': '#e3f2fd', // Ativos - azul claro
      '2': '#ffebee', // Passivos - vermelho claro
      '3': '#e8f5e9', // Capital - verde claro
      '4': '#fff3e0', // Rendimentos - laranja claro
      '5': '#f3e5f5', // Gastos - roxo claro
    };
    return colors[classe] || '#f5f5f5';
  };
  
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Plano de Contas PGC-NIRF
      </Typography>
      
      {/* Filtros */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Classe</InputLabel>
          <Select
            value={filtro.classe}
            label="Classe"
            onChange={handleClasseChange}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="1">1 - Ativos</MenuItem>
            <MenuItem value="2">2 - Passivos</MenuItem>
            <MenuItem value="3">3 - Capital Próprio</MenuItem>
            <MenuItem value="4">4 - Rendimentos</MenuItem>
            <MenuItem value="5">5 - Gastos</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Buscar conta"
          variant="outlined"
          size="small"
          value={filtro.texto}
          onChange={handleTextoChange}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      
      {/* Tabela */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell width="100">Código</TableCell>
              <TableCell>Nome da Conta</TableCell>
              <TableCell width="100">Classe</TableCell>
              <TableCell width="100">Natureza</TableCell>
              <TableCell width="100">Nível</TableCell>
              <TableCell width="100">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contas.map((conta) => (
              <TableRow
                key={conta.id}
                hover
                onClick={() => handleSelectConta(conta)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: getClasseColor(conta.classe),
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {conta.codigo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {conta.nome}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {conta.descricao}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`Classe ${conta.classe}`}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={conta.natureza === 'D' ? 'Débito' : 'Crédito'}
                    color={getNaturezaColor(conta.natureza)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`Nível ${conta.nivel}`}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={conta.ativo ? 'Ativo' : 'Inativo'}
                    color={conta.ativo ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box mt={2}>
        <Typography variant="caption" color="textSecondary">
          Total: {contas.length} contas • PGC-NIRF conforme Decreto 70/2009
        </Typography>
      </Box>
    </Paper>
  );
};

export default PlanoContasList;