import React from 'react';

const DashboardPage = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card card-custom">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">Faturação Mensal</h6>
                  <h4 className="card-title text-primary">€ 45.280,50</h4>
                  <span className="badge bg-success">+12.5%</span>
                </div>
                <i className="bi bi-graph-up text-primary fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card card-custom">
            <div className="card-header">
              <h5 className="card-title mb-0">Faturas Recentes</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Cliente</th>
                      <th>Data</th>
                      <th>Valor</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>FAT-2024-001</td>
                      <td>Cliente Exemplo S.A.</td>
                      <td>15/01/2024</td>
                      <td className="fw-bold">€ 1.250,00</td>
                      <td><span className="badge bg-success">Paga</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-12">
          <button className="btn btn-custom-primary me-2">
            <i className="bi bi-plus-circle me-2"></i>
            Nova Fatura
          </button>
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Exportar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;