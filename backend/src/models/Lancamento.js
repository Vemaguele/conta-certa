// backend/src/models/Lancamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lancamento = sequelize.define('Lancamento', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  numero: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  diario: {
    type: DataTypes.ENUM('VEN', 'COM', 'CAI', 'BAN', 'SAL', 'OUT'),
    allowNull: false,
    comment: 'VEN-Vendas, COM-Compras, CAI-Caixa, BAN-Banco, SAL-Salários, OUT-Outros'
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  valor_total: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  arquivo_anexo: {
    type: DataTypes.STRING(500)
  },
  status: {
    type: DataTypes.ENUM('rascunho', 'confirmado', 'cancelado'),
    defaultValue: 'rascunho'
  },
  usuario_id: {
    type: DataTypes.UUID
  }
}, {
  tableName: 'lancamentos',
  timestamps: true
});

module.exports = Lancamento;