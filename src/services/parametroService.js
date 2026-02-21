// frontend/src/services/parametroService.js
import api from './api';

const parametroService = {
  async listar() {
    const response = await api.get('/contabilidade/parametros');
    return response.data;
  },

  async obter(id) {
    const response = await api.get(`/contabilidade/parametros/${id}`);
    return response.data;
  },

  async obterPorChave(chave) {
    const response = await api.get(`/contabilidade/parametros/chave/${chave}`);
    return response.data;
  },

  async criar(dados) {
    const response = await api.post('/contabilidade/parametros', dados);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/contabilidade/parametros/${id}`, dados);
    return response.data;
  }
};

export default parametroService;