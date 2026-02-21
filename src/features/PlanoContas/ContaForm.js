import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { adicionarConta, atualizarConta } from './features/planoContas/planoContasSlice';
import {
  Box, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, Grid,
  Paper, Typography, Alert
} from '@mui/material';

const ContaForm = ({ conta, onCancel }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    codigo: conta?.codigo || '',
    nome: conta?.nome || '',
    descricao: conta?.descricao || '',
    classe: conta?.classe || '',
    natureza: conta?.natureza || '',
    nivel: conta?.nivel || 1,
    ativo: conta?.ativo ?? true
  });
  
  const [erros, setErros] = useState({});
  
  const classesPGC = [
    { codigo: '1', nome: 'Ativos' },
    { codigo: '2', nome: 'Passivos' },
    { codigo: '3', nome: 'Capital Próprio' },
    { codigo: '4', nome: 'Rendimentos' },
    { codigo: '5', nome: 'Gastos' },
    { codigo: '6', nome: 'Contas de Ordem' },
    { codigo: '7', nome: 'Contas de Compromissos' }
  ];
  
  const validarForm = () => {
    const novosErros = {};
    
    if (!formData.codigo.match(/^\d{2,3}$/)) {
      novosErros.codigo = 'Código deve ter 2-3 dígitos numéricos';
    }
    
    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }
    
    if (!formData.classe) {
      novosErros.classe = 'Classe é obrigatória';
    }
    
    if (!formData.natureza) {
      novosErros.natureza = 'Natureza é obrigatória';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarForm()) {
      return;
    }
    
    const contaCompleta = {
      ...formData,
      id: conta?.id || Date.now(),
      dataCriacao: conta?.dataCriacao || new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    };
    
    if (conta) {
      dispatch(atualizarConta(contaCompleta));
    } else {
      dispatch(adicionarConta(contaCompleta));
    }
    
    if (onCancel) {
      onCancel();
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {conta ? 'Editar Conta' : 'Nova Conta'}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Código *"
              value={formData.codigo}
              onChange={(e) => setFormData({...formData, codigo: e.target.value})}
              error={!!erros.codigo}
              helperText={erros.codigo}
              placeholder="Ex: 121"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!erros.classe}>
              <InputLabel>Classe *</InputLabel>
              <Select
                value={formData.classe}
                label="Classe *"
                onChange={(e) => setFormData({...formData, classe: e.target.value})}
              >
                {classesPGC.map(classe => (
                  <MenuItem key={classe.codigo} value={classe.codigo}>
                    {classe.codigo} - {classe.nome}
                  </MenuItem>
                ))}
              </Select>
              {erros.classe && (
                <Typography variant="caption" color="error">
                  {erros.classe}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da Conta *"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              error={!!erros.nome}
              helperText={erros.nome}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              multiline
              rows={2}
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!erros.natureza}>
              <InputLabel>Natureza *</InputLabel>
              <Select
                value={formData.natureza}
                label="Natureza *"
                onChange={(e) => setFormData({...formData, natureza: e.target.value})}
              >
                <MenuItem value="D">Débito</MenuItem>
                <MenuItem value="C">Crédito</MenuItem>
                <MenuItem value="D/C">Débito/Crédito</MenuItem>
              </Select>
              {erros.natureza && (
                <Typography variant="caption" color="error">
                  {erros.natureza}
                </Typography>
              )}
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Nível</InputLabel>
              <Select
                value={formData.nivel}
                label="Nível"
                onChange={(e) => setFormData({...formData, nivel: e.target.value})}
              >
                <MenuItem value={1}>1 - Sintético</MenuItem>
                <MenuItem value={2}>2 - Analítico</MenuItem>
                <MenuItem value={3}>3 - Subanalítico</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="caption">
                <strong>Conforme PGC-NIRF:</strong> Contas de 1º dígito (ex: 1, 2, 3) são sintéticas.
                Use 2-3 dígitos para contas analíticas.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
        
        <Box display="flex" gap={2} mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            {conta ? 'Atualizar' : 'Salvar'}
          </Button>
          
          <Button
            variant="outlined"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ContaForm;