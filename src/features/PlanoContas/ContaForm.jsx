/**
 * ContaForm.jsx - Formulário de Criação/Edição de Contas Contabilísticas
 * 
 * Componente para adicionar ou editar contas do Plano de Contas PGC-NIRF
 * Conforme estrutura do Decreto 70/2009 de Moçambique
 * 
 * @module ContaForm
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Alert,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { adicionarConta, atualizarConta } from './planoContasSlice';

/**
 * Componente de formulário para contas contabilísticas
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.conta - Conta a ser editada (null para nova conta)
 * @param {Function} props.onCancel - Função chamada ao cancelar
 * @returns {JSX.Element} Formulário de conta
 */
const ContaForm = ({ conta, onCancel }) => {
  const dispatch = useDispatch();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    descricao: '',
    classe: '',
    natureza: '',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true
  });
  
  const [erros, setErros] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Carregar dados da conta quando em modo edição
  useEffect(() => {
    if (conta) {
      setFormData({
        codigo: conta.codigo || '',
        nome: conta.nome || '',
        descricao: conta.descricao || '',
        classe: conta.classe || '',
        natureza: conta.natureza || '',
        nivel: conta.nivel || 1,
        ativo: conta.ativo !== undefined ? conta.ativo : true,
        aceitaLancamentos: conta.aceitaLancamentos !== undefined ? conta.aceitaLancamentos : true
      });
    }
  }, [conta]);

  // Classes do PGC-NIRF
  const classesPGC = [
    { codigo: '1', nome: 'Ativos', naturezaPadrao: 'D' },
    { codigo: '2', nome: 'Passivos', naturezaPadrao: 'C' },
    { codigo: '3', nome: 'Capital Próprio', naturezaPadrao: 'C' },
    { codigo: '4', nome: 'Rendimentos', naturezaPadrao: 'C' },
    { codigo: '5', nome: 'Gastos', naturezaPadrao: 'D' },
    { codigo: '6', nome: 'Contas de Ordem', naturezaPadrao: 'D/C' },
    { codigo: '7', nome: 'Contas de Compromissos', naturezaPadrao: 'D/C' }
  ];

  // Opções de natureza
  const naturezas = [
    { codigo: 'D', nome: 'Débito', descricao: 'Aumenta por débito, diminui por crédito' },
    { codigo: 'C', nome: 'Crédito', descricao: 'Aumenta por crédito, diminui por débito' },
    { codigo: 'D/C', nome: 'Débito/Crédito', descricao: 'Pode ter saldo devedor ou credor' }
  ];

  /**
   * Valida os dados do formulário antes de submeter
   * @returns {boolean} True se os dados são válidos
   */
  const validarForm = () => {
    const novosErros = {};
    
    // Validação do código (2-3 dígitos numéricos)
    if (!formData.codigo) {
      novosErros.codigo = 'Código é obrigatório';
    } else if (!/^\d{2,4}$/.test(formData.codigo)) {
      novosErros.codigo = 'Código deve ter 2-4 dígitos numéricos';
    }
    
    // Validação do nome
    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    } else if (formData.nome.length > 100) {
      novosErros.nome = 'Nome deve ter no máximo 100 caracteres';
    }
    
    // Validação da classe
    if (!formData.classe) {
      novosErros.classe = 'Classe é obrigatória';
    }
    
    // Validação da natureza
    if (!formData.natureza) {
      novosErros.natureza = 'Natureza é obrigatória';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  /**
   * Manipulador de submissão do formulário
   * @param {Event} e - Evento de submissão
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const contaCompleta = {
        ...formData,
        id: conta?.id || Date.now(),
        dataCriacao: conta?.dataCriacao || new Date().toISOString(),
        dataAtualizacao: new Date().toISOString()
      };
      
      if (conta) {
        await dispatch(atualizarConta(contaCompleta));
      } else {
        await dispatch(adicionarConta(contaCompleta));
      }
      
      // Fechar formulário após sucesso
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Manipulador de alteração nos campos
   * @param {Event} e - Evento de alteração
   */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro do campo quando o utilizador começa a digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        {/* Código da conta */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="codigo"
            label="Código da Conta *"
            value={formData.codigo}
            onChange={handleChange}
            error={!!erros.codigo}
            helperText={erros.codigo || 'Ex: 111, 121, 211'}
            placeholder="111"
            disabled={submitting}
            inputProps={{ maxLength: 4 }}
          />
        </Grid>
        
        {/* Classe contabilística */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!erros.classe}>
            <InputLabel>Classe *</InputLabel>
            <Select
              name="classe"
              value={formData.classe}
              label="Classe *"
              onChange={handleChange}
              disabled={submitting}
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
        
        {/* Nome da conta */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="nome"
            label="Nome da Conta *"
            value={formData.nome}
            onChange={handleChange}
            error={!!erros.nome}
            helperText={erros.nome || 'Nome descritivo da conta'}
            placeholder="Ex: Ativos fixos tangíveis"
            disabled={submitting}
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        
        {/* Descrição */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="descricao"
            label="Descrição"
            multiline
            rows={2}
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição detalhada da conta conforme PGC-NIRF"
            disabled={submitting}
          />
        </Grid>
        
        {/* Natureza */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!erros.natureza}>
            <InputLabel>Natureza *</InputLabel>
            <Select
              name="natureza"
              value={formData.natureza}
              label="Natureza *"
              onChange={handleChange}
              disabled={submitting}
            >
              {naturezas.map(nat => (
                <MenuItem key={nat.codigo} value={nat.codigo}>
                  {nat.nome} - {nat.descricao}
                </MenuItem>
              ))}
            </Select>
            {erros.natureza && (
              <Typography variant="caption" color="error">
                {erros.natureza}
              </Typography>
            )}
          </FormControl>
        </Grid>
        
        {/* Nível hierárquico */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Nível</InputLabel>
            <Select
              name="nivel"
              value={formData.nivel}
              label="Nível"
              onChange={handleChange}
              disabled={submitting}
            >
              <MenuItem value={1}>1 - Sintético (Classe)</MenuItem>
              <MenuItem value={2}>2 - Analítico (Subclasse)</MenuItem>
              <MenuItem value={3}>3 - Subanalítico (Conta)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Switches de configuração */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            Configurações Adicionais
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                name="ativo"
                checked={formData.ativo}
                onChange={handleChange}
                color="primary"
                disabled={submitting}
              />
            }
            label="Conta Ativa"
          />
          <Typography variant="caption" color="textSecondary" display="block">
            Contas inativas não aparecem em listas de seleção
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                name="aceitaLancamentos"
                checked={formData.aceitaLancamentos}
                onChange={handleChange}
                color="primary"
                disabled={submitting}
              />
            }
            label="Aceita Lançamentos"
          />
          <Typography variant="caption" color="textSecondary" display="block">
            Contas sintéticas (nível 1) geralmente não aceitam lançamentos diretos
          </Typography>
        </Grid>
        
        {/* Informação adicional */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="caption">
              <strong>Estrutura PGC-NIRF:</strong> O código deve seguir a hierarquia:
              <br />• 1 dígito: Classe (ex: 1 - Ativos)
              <br />• 2 dígitos: Subclasse (ex: 11 - Ativos não correntes)
              <br />• 3 dígitos: Conta (ex: 111 - Ativos fixos tangíveis)
              <br />• 4 dígitos: Subconta (ex: 1111 - Edifícios)
            </Typography>
          </Alert>
        </Grid>
      </Grid>
      
      {/* Botões de ação */}
      <Box display="flex" gap={2} mt={3}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={submitting}
          size="large"
          sx={{ flex: 1 }}
        >
          {submitting ? 'A guardar...' : (conta ? 'Atualizar' : 'Salvar')}
        </Button>
        
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CancelIcon />}
          onClick={onCancel}
          disabled={submitting}
          size="large"
          sx={{ flex: 1 }}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default ContaForm;