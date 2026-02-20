// backend/src/config/init.js
const { Parametro, Conta } = require('../models');

const parametrosIniciais = [
  { chave: 'MOEDA_PADRAO', valor: 'MTN', tipo: 'texto', descricao: 'Moeda principal do sistema' },
  { chave: 'FORMATO_DATA', valor: 'DD/MM/YYYY', tipo: 'texto', descricao: 'Formato de data padrão' },
  { chave: 'CONTROLE_ESTOQUE', valor: 'true', tipo: 'booleano', descricao: 'Ativar controle de estoque' },
  { chave: 'PERMITIR_LANCAMENTOS_PERIODOS_ANTERIORES', valor: 'false', tipo: 'booleano', descricao: 'Permitir lançamentos em períodos já encerrados' }
];

async function initParametros() {
  for (const param of parametrosIniciais) {
    await Parametro.findOrCreate({
      where: { chave: param.chave },
      defaults: param
    });
  }
  console.log('✓ Parâmetros iniciais configurados');
}

async function initPlanoContasPadrao() {
  try {
    const planoContasPadrao = require('../data/plano_contas_decreto_70_2009.json');
    
    for (const conta of planoContasPadrao) {
      await Conta.findOrCreate({
        where: { codigo: conta.codigo },
        defaults: conta
      });
    }
    
    console.log('✓ Plano de contas padrão importado');
  } catch (error) {
    console.error('Erro ao importar plano de contas padrão:', error);
  }
}

async function initDatabase() {
  console.log('Inicializando banco de dados...');
  await initParametros();
  await initPlanoContasPadrao();
  console.log('Banco de dados inicializado com sucesso!');
}

module.exports = { initDatabase, initParametros, initPlanoContasPadrao };