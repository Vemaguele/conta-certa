// backend/src/models/Conta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conta = sequelize.define('Conta', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      is: /^[\d.]+$/ // Apenas números e pontos
    }
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    comment: '1-Classe, 2-Grupo, 3-Subgrupo, 4-Rubrica, 5-Sub-rubrica'
  },
  tipo_conta: {
    type: DataTypes.ENUM('A', 'P', 'CP', 'R', 'G', 'O'),
    field: 'tipo_conta',
    comment: 'A-Ativo, P-Passivo, CP-Capital Próprio, R-Rendimentos, G-Gastos, O-Outras'
  },
  natureza: {
    type: DataTypes.ENUM('D', 'C'),
    allowNull: false,
    comment: 'D-Devedora, C-Credora'
  },
  aceita_lancamentos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  conta_pai_id: {
    type: DataTypes.UUID,
    references: {
      model: 'contas',
      key: 'id'
    }
  },
  referencia_ncrf: {
    type: DataTypes.STRING(50),
    comment: 'Referência à Norma NCRF correspondente'
  },
  
  // Contas padrão para configuração
  is_default_venda: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_default_custo_venda: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_default_caixa: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_default_banco: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'contas',
  timestamps: true,
  hooks: {
    beforeValidate: (conta) => {
      // Validação: conta com filhos não pode aceitar lançamentos
      if (conta.aceita_lancamentos && conta.conta_pai_id) {
        // Lógica para verificar se tem filhos
      }
    }
  }
});

// Relacionamento hierárquico
Conta.belongsTo(Conta, { as: 'conta_pai', foreignKey: 'conta_pai_id' });
Conta.hasMany(Conta, { as: 'filhos', foreignKey: 'conta_pai_id' });

module.exports = Conta;