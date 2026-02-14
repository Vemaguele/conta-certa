/**
 * PlanoContasList.jsx - Lista do Plano de Contas com Filtros
 * 
 * Componente para exibição e filtragem das contas contabilísticas
 * Conforme PGC-NIRF do Decreto 70/2009 de Moçambique
 * 
 * @module PlanoContasList
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment,
  CircularProgress,
  Alert,
  Grid,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import {
  fetchContas,
  setContaSelecionada,
  setFiltroClasse,
  setFiltroTexto,
  setFiltroNatureza,
  selectContasFiltradas,
  selectStatus,
  selectFiltro,
  removerConta
} from './planoContasSlice';

/**
 * Componente de listagem do plano de contas com filtros
 * 
 * @returns {JSX.Element} Tabela de contas com filtros
 */
const PlanoContasList = () => {
  const dispatch = useDispatch();
  const contas = useSelector(selectContasFiltradas);
  const status = useSelector(selectStatus);
  const filtro = useSelector(selectFiltro);
  
  // Estado local para paginação
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [filtroAvancado, setFiltroAvancado] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContas());
    }
  }, [status, dispatch]);

  // Atualizar filtro de texto com debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFiltroTexto(searchText));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  /**
   * Manipuladores de eventos
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (conta) => {
    dispatch(setContaSelecionada(conta));
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja eliminar esta conta?')) {
      dispatch(removerConta(id));
    }
  };

  const handleClearFilters = () => {
    setSearchText('');
    dispatch(setFiltroTexto(''));
    dispatch(setFiltroClasse(''));
    dispatch(setFiltroNatureza(''));
  };

  const handleRefresh = () => {
    dispatch(fetchContas());
  };

  /**
   * Obter cor de fundo baseada na classe
   */
  const getClasseColor = (classe) => {
    const colors = {
      '1': '#e3f2fd', // Ativos - azul claro
      '2': '#ffebee', // Passivos - vermelho claro
      '3': '#e8f5e9', // Capital - verde claro
      '4': '#fff3e0', // Rendimentos - laranja claro
      '5': '#f3e5f5', // Gastos - roxo claro
      '6': '#e0f2f1', // Contas de Ordem - azul petróleo claro
      '7': '#fff8e1', // Compromissos - amarelo claro
    };
    return colors[classe] || '#f5f5f5';
  };

  /**
   * Obter cor do chip de natureza
   */
  const getNaturezaColor = (natureza) => {
    switch (natureza) {
      case 'D': return 'error';
      case 'C': return 'success';
      case 'D/C': return 'warning';
      default: return 'default';
    }
  };

  /**
   * Renderizar estado de carregamento
   */
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  /**
   * Renderizar estado de erro
   */
  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Erro ao carregar o plano de contas. Tente novamente.
        <Button size="small" onClick={handleRefresh} sx={{ ml: 2 }}>
          Tentar novamente
        </Button>
      </Alert>
    );
  }

  // Contas paginadas
  const contasPaginadas = contas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Plano de Contas PGC-NIRF
        </Typography>
        <Box>
          <Tooltip title="Atualizar">
            <IconButton onClick={handleRefresh} size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtros avançados">
            <IconButton 
              onClick={() => setFiltroAvancado(!filtroAvancado)} 
              size="small"
              color={filtroAvancado ? 'primary' : 'default'}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Barra de pesquisa */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por código, nome ou descrição..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchText && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchText('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Filtros avançados */}
      {filtroAvancado && (
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por Classe</InputLabel>
              <Select
                value={filtro.classe || ''}
                label="Filtrar por Classe"
                onChange={(e) => dispatch(setFiltroClasse(e.target.value))}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="1">Classe 1 - Ativos</MenuItem>
                <MenuItem value="2">Classe 2 - Passivos</MenuItem>
                <MenuItem value="3">Classe 3 - Capital Próprio</MenuItem>
                <MenuItem value="4">Classe 4 - Rendimentos</MenuItem>
                <MenuItem value="5">Classe 5 - Gastos</MenuItem>
                <MenuItem value="6">Classe 6 - Contas de Ordem</MenuItem>
                <MenuItem value="7">Classe 7 - Compromissos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Filtrar por Natureza</InputLabel>
              <Select
                value={filtro.natureza || ''}
                label="Filtrar por Natureza"
                onChange={(e) => dispatch(setFiltroNatureza(e.target.value))}
              >
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="D">Débito</MenuItem>
                <MenuItem value="C">Crédito</MenuItem>
                <MenuItem value="D/C">Débito/Crédito</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
              fullWidth
              size="medium"
            >
              Limpar Filtros
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Tabela */}
      <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell width="100">Código</TableCell>
              <TableCell>Nome da Conta</TableCell>
              <TableCell width="100">Classe</TableCell>
              <TableCell width="100">Natureza</TableCell>
              <TableCell width="80">Nível</TableCell>
              <TableCell width="100">Status</TableCell>
              <TableCell width="120" align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contasPaginadas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    Nenhuma conta encontrada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              contasPaginadas.map((conta) => (
                <TableRow
                  key={conta.id}
                  hover
                  sx={{
                    backgroundColor: getClasseColor(conta.classe),
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04) !important'
                    }
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
                    {conta.descricao && (
                      <Typography variant="caption" color="textSecondary" display="block">
                        {conta.descricao.substring(0, 60)}
                        {conta.descricao.length > 60 && '...'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`Classe ${conta.classe}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={conta.natureza === 'D' ? 'Débito' : 
                             conta.natureza === 'C' ? 'Crédito' : 'D/C'}
                      color={getNaturezaColor(conta.natureza)}
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={conta.nivel}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={conta.ativo ? 'Ativo' : 'Inativo'}
                      color={conta.ativo ? 'success' : 'default'}
                      size="small"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(conta)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(conta.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação e estatísticas */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="caption" color="textSecondary">
          Total: {contas.length} contas • PGC-NIRF conforme Decreto 70/2009
        </Typography>
        
        <TablePagination
          component="div"
          count={contas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Box>
    </Paper>
  );
};

export default PlanoContasList;