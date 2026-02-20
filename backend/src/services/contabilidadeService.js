// backend/src/services/contabilidadeService.js
const { Lancamento, ItemLancamento, Conta, Parametro } = require('../models');

async function getContaPadrao(tipo) {
  const contasPadrao = {
    venda: await Conta.findOne({ where: { is_default_venda: true } }),
    custo_venda: await Conta.findOne({ where: { is_default_custo_venda: true } }),
    caixa: await Conta.findOne({ where: { is_default_caixa: true } }),
    iva_liquidado: await Conta.findOne({ where: { codigo: '4.4.3.3' } }), // IVA liquidado
    iva_dedutivel: await Conta.findOne({ where: { codigo: '4.4.3.2' } }),  // IVA dedutível
    clientes: await Conta.findOne({ where: { codigo: '4.1' } }),          // Clientes
    fornecedores: await Conta.findOne({ where: { codigo: '4.2' } }),      // Fornecedores
  };
  
  return contasPadrao[tipo];
}

async function gerarLancamentoContabil({
  tipo,
  data,
  numeroDocumento,
  clienteId,
  fornecedorId,
  valorTotal,
  condicoesPagamento,
  itens,
  transaction
}) {
  
  // Buscar parâmetros do sistema
  const moedaPadrao = await Parametro.findOne({ 
    where: { chave: 'MOEDA_PADRAO' } 
  });
  
  let lancamento;
  
  switch(tipo) {
    case 'venda':
      // Débito: Clientes (ou Caixa se pagamento à vista)
      // Crédito: Vendas
      // Crédito: IVA liquidado
      
      const contaVenda = await getContaPadrao('venda');
      const contaClientes = await getContaPadrao('clientes');
      const contaIva = await getContaPadrao('iva_liquidado');
      
      // Calcular valores (exemplo com IVA 16%)
      const valorSemIva = valorTotal / 1.16;
      const valorIva = valorTotal - valorSemIva;
      
      lancamento = await Lancamento.create({
        numero: await gerarNumeroLancamento(),
        data,
        diario: 'VEN',
        descricao: `Venda ${numeroDocumento}`,
        valor_total: valorTotal,
        moeda: moedaPadrao?.valor || 'MTN',
        status: 'confirmado'
      }, { transaction });
      
      // Débito em Clientes (ou Caixa)
      await ItemLancamento.create({
        lancamentoId: lancamento.id,
        contaId: condicoesPagamento === 'vista' ? contaCaixa.id : contaClientes.id,
        valor: valorTotal,
        tipo: 'D',
        descricao: `Cliente: ${clienteId}`
      }, { transaction });
      
      // Crédito em Vendas (sem IVA)
      await ItemLancamento.create({
        lancamentoId: lancamento.id,
        contaId: contaVenda.id,
        valor: valorSemIva,
        tipo: 'C'
      }, { transaction });
      
      // Crédito em IVA
      await ItemLancamento.create({
        lancamentoId: lancamento.id,
        contaId: contaIva.id,
        valor: valorIva,
        tipo: 'C'
      }, { transaction });
      
      break;
      
    case 'compra':
      // Lógica para compras (débito em compras/estoque, crédito em fornecedores)
      break;
      
    case 'pagamento':
      // Lógica para pagamentos (débito em fornecedores, crédito em bancos/caixa)
      break;
      
    case 'recebimento':
      // Lógica para recebimentos (débito em bancos/caixa, crédito em clientes)
      break;
      
    case 'folha_pagamento':
      // Lógica para folha de pagamento
      break;
  }
  
  return lancamento;
}

async function gerarNumeroLancamento() {
  const ano = new Date().getFullYear();
  const mes = String(new Date().getMonth() + 1).padStart(2, '0');
  
  const ultimoLancamento = await Lancamento.findOne({
    where: {
      numero: {
        [Op.like]: `LAN-${ano}${mes}%`
      }
    },
    order: [['numero', 'DESC']]
  });
  
  if (ultimoLancamento) {
    const ultimoNumero = parseInt(ultimoLancamento.numero.split('-')[2]);
    const novoNumero = ultimoNumero + 1;
    return `LAN-${ano}${mes}-${String(novoNumero).padStart(4, '0')}`;
  }
  
  return `LAN-${ano}${mes}-0001`;
}

module.exports = {
  gerarLancamentoContabil,
  gerarNumeroLancamento,
  getContaPadrao
};