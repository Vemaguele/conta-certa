// backend/src/controllers/facturacaoController.js
const { Factura, ItemFactura, Cliente, Conta } = require('../models');
const { gerarLancamentoContabil } = require('../services/contabilidadeService');

const facturacaoController = {
  async criarFactura(req, res) {
    try {
      const { clienteId, items, condicoesPagamento, ...dados } = req.body;
      
      // Iniciar transação
      const result = await sequelize.transaction(async (t) => {
        // 1. Criar a fatura
        const factura = await Factura.create({
          ...dados,
          clienteId,
          data: new Date(),
          numero: await gerarNumeroFactura(),
          status: 'emitida'
        }, { transaction: t });
        
        // 2. Criar itens da fatura
        let totalFactura = 0;
        for (const item of items) {
          const totalItem = item.quantidade * item.precoUnitario;
          totalFactura += totalItem;
          
          await ItemFactura.create({
            facturaId: factura.id,
            ...item,
            total: totalItem
          }, { transaction: t });
        }
        
        // 3. Atualizar total da fatura
        await factura.update({ total: totalFactura }, { transaction: t });
        
        // 4. Gerar lançamento contábil automático (integração com contabilidade)
        const lancamento = await gerarLancamentoContabil({
          tipo: 'venda',
          data: factura.data,
          numeroDocumento: factura.numero,
          clienteId,
          valorTotal: totalFactura,
          condicoesPagamento,
          transaction: t
        });
        
        // 5. Atualizar fatura com ID do lançamento
        await factura.update({ lancamentoId: lancamento.id }, { transaction: t });
        
        return factura;
      });
      
      res.status(201).json({
        success: true,
        data: result,
        message: 'Fatura criada e contabilizada com sucesso'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar fatura',
        error: error.message
      });
    }
  },
  
  async estornarFactura(req, res) {
    try {
      const { id } = req.params;
      const { motivo } = req.body;
      
      const result = await sequelize.transaction(async (t) => {
        const factura = await Factura.findByPk(id);
        
        if (!factura) {
          throw new Error('Fatura não encontrada');
        }
        
        // 1. Atualizar status
        await factura.update({ status: 'estornada' }, { transaction: t });
        
        // 2. Criar nota de crédito
        const notaCredito = await NotaCredito.create({
          facturaId: factura.id,
          motivo,
          valor: factura.total,
          data: new Date(),
          numero: await gerarNumeroNotaCredito()
        }, { transaction: t });
        
        // 3. Gerar lançamento de estorno na contabilidade
        if (factura.lancamentoId) {
          await gerarLancamentoContabil({
            tipo: 'estorno_venda',
            data: new Date(),
            numeroDocumento: notaCredito.numero,
            clienteId: factura.clienteId,
            valorTotal: factura.total,
            lancamentoOriginalId: factura.lancamentoId,
            transaction: t
          });
        }
        
        return notaCredito;
      });
      
      res.json({
        success: true,
        data: result,
        message: 'Fatura estornada com sucesso'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao estornar fatura',
        error: error.message
      });
    }
  }
};

module.exports = facturacaoController;