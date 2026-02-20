// backend/src/controllers/contaController.js
const { Conta } = require('../models');
const { Op } = require('sequelize');

const contaController = {
  // Listar todas as contas (com estrutura hierárquica)
  async listar(req, res) {
    try {
      const contas = await Conta.findAll({
        where: { ativo: true },
        include: [{
          model: Conta,
          as: 'filhos',
          include: [{ model: Conta, as: 'filhos' }]
        }],
        order: [['codigo', 'ASC']]
      });
      
      // Filtrar apenas contas raiz (sem pai)
      const contasRaiz = contas.filter(c => !c.conta_pai_id);
      
      res.json({
        success: true,
        data: contasRaiz
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar contas',
        error: error.message
      });
    }
  },

  // Obter uma conta específica
  async obter(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.id, {
        include: [
          { model: Conta, as: 'conta_pai' },
          { model: Conta, as: 'filhos' }
        ]
      });
      
      if (!conta) {
        return res.status(404).json({
          success: false,
          message: 'Conta não encontrada'
        });
      }
      
      res.json({
        success: true,
        data: conta
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao obter conta',
        error: error.message
      });
    }
  },

  // Criar nova conta
  async criar(req, res) {
    try {
      const { codigo, nome, nivel, tipo_conta, natureza, conta_pai_id, ...dados } = req.body;
      
      // Validar se código já existe
      const contaExistente = await Conta.findOne({ where: { codigo } });
      if (contaExistente) {
        return res.status(400).json({
          success: false,
          message: 'Código de conta já existe'
        });
      }
      
      // Validar conta pai se fornecida
      if (conta_pai_id) {
        const contaPai = await Conta.findByPk(conta_pai_id);
        if (!contaPai) {
          return res.status(400).json({
            success: false,
            message: 'Conta pai não encontrada'
          });
        }
        
        // Validar nível
        if (contaPai.nivel >= 5) {
          return res.status(400).json({
            success: false,
            message: 'Não é possível criar subcontas de uma conta de nível 5'
          });
        }
      }
      
      const novaConta = await Conta.create({
        codigo,
        nome,
        nivel,
        tipo_conta,
        natureza,
        conta_pai_id,
        ...dados
      });
      
      res.status(201).json({
        success: true,
        data: novaConta,
        message: 'Conta criada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar conta',
        error: error.message
      });
    }
  },

  // Atualizar conta
  async atualizar(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.id);
      
      if (!conta) {
        return res.status(404).json({
          success: false,
          message: 'Conta não encontrada'
        });
      }
      
      // Verificar se pode alterar código (cuidado com integridade)
      if (req.body.codigo && req.body.codigo !== conta.codigo) {
        const contaExistente = await Conta.findOne({ 
          where: { codigo: req.body.codigo } 
        });
        if (contaExistente) {
          return res.status(400).json({
            success: false,
            message: 'Código de conta já existe'
          });
        }
      }
      
      await conta.update(req.body);
      
      res.json({
        success: true,
        data: conta,
        message: 'Conta atualizada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar conta',
        error: error.message
      });
    }
  },

  // Desativar conta (soft delete)
  async desativar(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.id, {
        include: [{ model: Conta, as: 'filhos' }]
      });
      
      if (!conta) {
        return res.status(404).json({
          success: false,
          message: 'Conta não encontrada'
        });
      }
      
      // Verificar se tem filhos ativos
      if (conta.filhos && conta.filhos.some(f => f.ativo)) {
        return res.status(400).json({
          success: false,
          message: 'Não é possível desativar uma conta com subcontas ativas'
        });
      }
      
      await conta.update({ ativo: false });
      
      res.json({
        success: true,
        message: 'Conta desativada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao desativar conta',
        error: error.message
      });
    }
  },

  // Importar plano de contas do Decreto 70/2009
  async importarPadrao(req, res) {
    try {
      const planoContasPadrao = require('../data/plano_contas_decreto_70_2009.json');
      
      // Processar em transação
      const sequelize = require('../config/database');
      const resultado = await sequelize.transaction(async (t) => {
        const contasCriadas = [];
        
        for (const conta of planoContasPadrao) {
          const [contaCriada, created] = await Conta.findOrCreate({
            where: { codigo: conta.codigo },
            defaults: conta,
            transaction: t
          });
          
          if (created) {
            contasCriadas.push(contaCriada);
          }
        }
        
        return contasCriadas;
      });
      
      res.json({
        success: true,
        message: `${resultado.length} contas importadas com sucesso`,
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao importar plano de contas',
        error: error.message
      });
    }
  }
};

module.exports = contaController;