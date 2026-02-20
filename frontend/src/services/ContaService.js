// frontend/src/services/contaService.js
import api from './api';

const contaService = {
  async listar() {
    const response = await api.get('/contabilidade/contas');
    return response.data;
  },

  async obter(id) {
    const response = await api.get(`/contabilidade/contas/${id}`);
    return response.data;
  },

  async criar(dados) {
    const response = await api.post('/contabilidade/contas', dados);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/contabilidade/contas/${id}`, dados);
    return response.data;
  },

  async desativar(id) {
    const response = await api.delete(`/contabilidade/contas/${id}`);
    return response.data;
  },

  async importarPadrao() {
    const response = await api.post('/contabilidade/contas/importar/padrao');
    return response.data;
  }
};

export default contaService;