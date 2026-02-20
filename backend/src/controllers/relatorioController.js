// backend/src/controllers/relatorioController.js
const { Factura, Lancamento, Cliente, Fornecedor } = require('../models');
const { gerarPDF } = require('../services/pdfService');
const { gerarExcel } = require('../services/excelService');

const relatorioController = {
  async relatorioFinanceiro(req, res) {
    try {
      const { dataInicio, dataFim, tipo } = req.query;
      
      // Buscar dados de vários módulos
      const [faturas, lancamentos, clientes, fornecedores] = await Promise.all([
        Factura.findAll({
          where: {
            data: { [Op.between]: [dataInicio, dataFim] }
          }
        }),
        Lancamento.findAll({
          where: {
            data: { [Op.between]: [dataInicio, dataFim] }
          },
          include: ['itens']
        }),
        Cliente.findAll(),
        Fornecedor.findAll()
      ]);
      
      // Calcular indicadores
      const totalFaturado = faturas.reduce((sum, f) => sum + f.total, 0);
      const totalPago = lancamentos
        .filter(l => l.diario === 'REC')
        .reduce((sum, l) => sum + l.valor_total, 0);
      
      const dadosRelatorio = {
        periodo: { dataInicio, dataFim },
        totais: {
          faturado: totalFaturado,
          recebido: totalPago,
          aReceber: totalFaturado - totalPago
        },
        clientes: clientes.length,
        fornecedores: fornecedores.length,
        faturas,
        lancamentos
      };
      
      // Gerar relatório no formato solicitado
      if (req.query.formato === 'pdf') {
        const pdf = await gerarPDF('relatorio-financeiro', dadosRelatorio);
        res.contentType('application/pdf');
        res.send(pdf);
      } else if (req.query.formato === 'excel') {
        const excel = await gerarExcel('relatorio-financeiro', dadosRelatorio);
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excel);
      } else {
        res.json({
          success: true,
          data: dadosRelatorio
        });
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao gerar relatório',
        error: error.message
      });
    }
  },
  
  async relatorioContabil(req, res) {
    try {
      const { dataInicio, dataFim, tipo } = req.query;
      
      // Balancete de verificação
      const lancamentos = await Lancamento.findAll({
        where: {
          data: { [Op.between]: [dataInicio, dataFim] },
          status: 'confirmado'
        },
        include: [{
          model: ItemLancamento,
          include: ['conta']
        }]
      });
      
      // Calcular saldos por conta
      const saldos = {};
      
      lancamentos.forEach(l => {
        l.itens.forEach(item => {
          const contaId = item.conta.id;
          if (!saldos[contaId]) {
            saldos[contaId] = {
              conta: item.conta,
              debito: 0,
              credito: 0,
              saldo: 0
            };
          }
          
          if (item.tipo === 'D') {
            saldos[contaId].debito += parseFloat(item.valor);
            saldos[contaId].saldo += parseFloat(item.valor);
          } else {
            saldos[contaId].credito += parseFloat(item.valor);
            saldos[contaId].saldo -= parseFloat(item.valor);
          }
        });
      });
      
      const balancete = Object.values(saldos).map(s => ({
        conta: `${s.conta.codigo} - ${s.conta.nome}`,
        debito: s.debito,
        credito: s.credito,
        saldo: s.saldo,
        natureza: s.saldo >= 0 ? 'Devedor' : 'Credor'
      }));
      
      res.json({
        success: true,
        data: {
          periodo: { dataInicio, dataFim },
          balancete
        }
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao gerar relatório contábil',
        error: error.message
      });
    }
  }
};

module.exports = relatorioController;