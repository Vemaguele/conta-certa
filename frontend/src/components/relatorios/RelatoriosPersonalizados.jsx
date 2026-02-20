// src/components/relatorios/RelatoriosPersonalizados.jsx
import React from 'react';
import { useConfig } from '../../context/ConfigContext';

const RelatoriosPersonalizados = () => {
  const { configs } = useConfig();
  const { empresa, contabilidade, imposto } = configs;

  const relatoriosDisponiveis = [
    {
      id: 1,
      nome: 'Balanço Patrimonial',
      descricao: 'Baseado no plano de contas configurado',
      planoContas: contabilidade.planoContas,
      icon: 'bi-graph-up'
    },
    {
      id: 2,
      nome: 'Demonstração de Resultados',
      descricao: 'Análise de receitas e despesas',
      periodo: empresa.periodoFiscal,
      icon: 'bi-cash-stack'
    },
    {
      id: 3,
      nome: 'Relatório de IVA',
      descricao: 'Declaração periódica de IVA',
      taxaIVA: imposto.ivaRate,
      periodo: imposto.vatPeriod,
      icon: 'bi-percent'
    },
    {
      id: 4,
      nome: 'Reconciliação Bancária',
      descricao: contabilidade.reconciliacaoAuto ? 
        'Reconciliação automática ativa' : 
        'Reconciliação manual necessária',
      icon: 'bi-bank'
    }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="row">
        {relatoriosDisponiveis.map(relatorio => (
          <div className="col-md-6 col-lg-3 mb-4" key={relatorio.id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                    <i className={`bi ${relatorio.icon} text-primary`}></i>
                  </div>
                  <h5 className="card-title mb-0">{relatorio.nome}</h5>
                </div>
                <p className="card-text text-muted">{relatorio.descricao}</p>
                
                {relatorio.planoContas && (
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-diagram-3 me-1"></i>
                      Plano: {relatorio.planoContas}
                    </small>
                  </div>
                )}
                
                {relatorio.taxaIVA && (
                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="bi bi-percent me-1"></i>
                      IVA: {relatorio.taxaIVA}%
                    </small>
                  </div>
                )}
                
                <button className="btn btn-outline-primary btn-sm w-100 mt-2">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatoriosPersonalizados;