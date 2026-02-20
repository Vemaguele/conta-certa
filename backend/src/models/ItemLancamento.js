// backend/src/models/ItemLancamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemLancamento = sequelize.define('ItemLancamento', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  lancamento_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'lancamentos',
      key: 'id'
    }
  },
  conta_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'contas',
      key: 'id'
    }
  },
  descricao: {
    type: DataTypes.STRING(255)
  },
  valor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  tipo: {
    type: DataTypes.ENUM('D', 'C'),
    allowNull: false,
    comment: 'D-Débito, C-Crédito'
  }
}, {
  tableName: 'itens_lancamento',
  timestamps: true,
  validate: {
    // Validação: Soma dos débitos = Soma dos créditos por lançamento
    async lancamentoBalanceado() {
      const Lancamento = require('./Lancamento');
      const lancamento = await Lancamento.findByPk(this.lancamento_id);
      if (lancamento && lancamento.status === 'confirmado') {
        const itens = await ItemLancamento.findAll({
          where: { lancamento_id: this.lancamento_id }
        });
        
        const totalDebitos = itens
          .filter(i => i.tipo === 'D')
          .reduce((sum, i) => sum + parseFloat(i.valor), 0);
        const totalCreditos = itens
          .filter(i => i.tipo === 'C')
          .reduce((sum, i) => sum + parseFloat(i.valor), 0);
        
        if (Math.abs(totalDebitos - totalCreditos) > 0.01) {
          throw new Error('O lançamento não está balanceado');
        }
      }
    }
  }
});

// Relacionamentos
ItemLancamento.belongsTo(Lancamento, { foreignKey: 'lancamento_id' });
ItemLancamento.belongsTo(Conta, { foreignKey: 'conta_id' });

module.exports = ItemLancamento;