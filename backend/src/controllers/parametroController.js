// backend/src/controllers/parametroController.js
const { Parametro } = require('../models');

const parametroController = {
  async listar(req, res) {
    try {
      const parametros = await Parametro.findAll();
      res.json({ success: true, data: parametros });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async obter(req, res) {
    try {
      const parametro = await Parametro.findByPk(req.params.id);
      if (!parametro) {
        return res.status(404).json({ success: false, message: 'Parâmetro não encontrado' });
      }
      res.json({ success: true, data: parametro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async obterPorChave(req, res) {
    try {
      const parametro = await Parametro.findOne({ 
        where: { chave: req.params.chave } 
      });
      
      if (!parametro) {
        return res.status(404).json({ success: false, message: 'Parâmetro não encontrado' });
      }
      
      res.json({ success: true, data: parametro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async criar(req, res) {
    try {
      const parametro = await Parametro.create(req.body);
      res.status(201).json({ success: true, data: parametro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const parametro = await Parametro.findByPk(req.params.id);
      if (!parametro) {
        return res.status(404).json({ success: false, message: 'Parâmetro não encontrado' });
      }
      
      await parametro.update(req.body);
      res.json({ success: true, data: parametro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = parametroController;