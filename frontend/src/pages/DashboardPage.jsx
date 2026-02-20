// src/pages/DashboardPage.jsx
import React from 'react';
import { useConfig } from '../context/ConfigContext';

const DashboardPage = () => {
  const { configs } = useConfig();

  const cards = [
    {
      title: 'Faturação',
      value: configs.faturacao.criacaoAutomatica ? 'Automática' : 'Manual',
      icon: 'receipt',
      color: 'primary',
      status: configs.faturacao.alertasAnomalias ? 'success' : 'warning'
    },
    {
      title: 'IVA Configurado',
      value: `${configs.imposto.ivaRate}%`,
      icon: 'percent',
      color: 'success',
      status: 'info'
    },
    {
      title: 'Módulos Ativos',
      value: `${configs.modulos.ativos.length}/8`,
      icon: 'puzzle',
      color: 'info',
      status: 'success'
    },
    {
      title: 'Segurança',
      value: configs.seguranca.twoFactor ? '2FA Ativo' : 'Padrão',
      icon: 'shield-check',
      color: 'warning',
      status: configs.seguranca.twoFactor ? 'success' : 'secondary'
    }
  ];

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-gray-800 mb-2">
          <i className="bi bi-speedometer2 me-2"></i>
          Dashboard Principal
        </h1>
        <p className="text-muted">
          Visão geral do sistema com configurações aplicadas
        </p>
      </div>

      {/* Cards de Status */}
      <div className="row mb-4">
        {cards.map((card, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-subtitle text-muted mb-2">{card.title}</h6>
                    <h4 className="card-title mb-0">{card.value}</h4>
                  </div>
                  <div className={`bg-${card.color} bg-opacity-10 p-2 rounded-circle`}>
                    <i className={`bi bi-${card.icon} text-${card.color} fs-4`}></i>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`badge bg-${card.status}`}>
                    {card.status === 'success' ? 'Ativo' : 
                     card.status === 'warning' ? 'Atenção' : 'Inativo'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Configurações Ativas */}
      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Configurações do Sistema</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Configuração</th>
                      <th>Valor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i className="bi bi-building me-2"></i>
                        Empresa
                      </td>
                      <td>Nome/Razão Social</td>
                      <td>{configs.empresa.nome}</td>
                      <td>
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i>
                          Configurado
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="bi bi-receipt me-2"></i>
                        Faturação
                      </td>
                      <td>Formato de Saída</td>
                      <td>{configs.faturacao.formatos.join(', ')}</td>
                      <td>
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i>
                          {configs.faturacao.formatos.length} formatos
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="bi bi-calculator me-2"></i>
                        Contabilidade
                      </td>
                      <td>Plano de Contas</td>
                      <td>{configs.contabilidade.planoContas}</td>
                      <td>
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i>
                          Configurado
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i className="bi bi-shield-check me-2"></i>
                        Segurança
                      </td>
                      <td>Autenticação 2FA</td>
                      <td>{configs.seguranca.twoFactor ? 'Ativo' : 'Inativo'}</td>
                      <td>
                        <span className={`badge ${configs.seguranca.twoFactor ? 'bg-success' : 'bg-warning'}`}>
                          <i className={`bi ${configs.seguranca.twoFactor ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-1`}></i>
                          {configs.seguranca.twoFactor ? 'Ativo' : 'Recomendado'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Ações Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="/configuracoes" className="btn btn-primary">
                  <i className="bi bi-gear me-2"></i>
                  Gerenciar Configurações
                </a>
                <a href="/faturacao" className="btn btn-outline-primary">
                  <i className="bi bi-file-earmark-plus me-2"></i>
                  Nova Fatura
                </a>
                <a href="/relatorios" className="btn btn-outline-success">
                  <i className="bi bi-graph-up me-2"></i>
                  Ver Relatórios
                </a>
              </div>
              
              <div className="mt-4">
                <h6>Status do Sistema</h6>
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Configurações Carregadas</span>
                    <span className="badge bg-success">OK</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Último Backup</span>
                    <span className="text-muted">Hoje</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between">
                    <span>Próxima Atualização</span>
                    <span className="text-muted">30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;