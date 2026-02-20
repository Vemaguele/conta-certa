// backend/src/models/Parametro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Parametro = sequelize.define('Parametro', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  chave: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('texto', 'numero', 'booleano', 'json'),
    defaultValue: 'texto'
  },
  descricao: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'parametros',
  timestamps: true
});

module.exports = Parametro;