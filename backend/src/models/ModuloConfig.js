// backend/src/models/ModuloConfig.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ModuloConfig = sequelize.define('ModuloConfig', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  modulo: {
    type: DataTypes.ENUM(
      'facturacao',
      'contabilidade',
      'clientes',
      'fornecedores',
      'tesouraria',
      'bancos',
      'impostos',
      'rh',
      'relatorios'
    ),
    allowNull: false,
    unique: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  configuracao: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  permissoes: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'modulos_config',
  timestamps: true
});

module.exports = ModuloConfig;