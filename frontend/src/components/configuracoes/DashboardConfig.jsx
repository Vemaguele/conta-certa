import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';

const DashboardConfig = () => {
  const { configs, exportConfigs, importConfigs } = useConfig();
  const [importStatus, setImportStatus] = useState({ type: '', message: '' });

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setImportStatus({ type: 'error', message: 'Apenas arquivos JSON são permitidos' });
      return;
    }

    try {
      await importConfigs(file);
      setImportStatus({ 
        type: 'success', 
        message: 'Configurações importadas com sucesso!' 
      });
      setTimeout(() => setImportStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      setImportStatus({ 
        type: 'error', 
        message: 'Erro ao importar configurações' 
      });
    }
  };

  // Estatísticas
  const totalModulos = 8;
  const modulosAtivos = configs.modulos.ativos.length;
  const percentualAtivos = Math.round((modulosAtivos / totalModulos) * 100);

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-speedometer2 text-info fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Dashboard de Configurações</h3>
          <p className="text-muted mb-0">Resumo e gestão das configurações do sistema</p>
        </div>
      </div>

      {/* Status de Importação */}
      {importStatus.message && (
        <div className={`alert alert-${importStatus.type} alert-dismissible fade show`}>
          {importStatus.message}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setImportStatus({ type: '', message: '' })}
          ></button>
        </div>
      )}

      <div className="row">
        {/* Cards de Resumo */}
        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-building text-primary fs-3"></i>
              </div>
              <h5>Empresa</h5>
              <p className="text-muted small">{configs.empresa.nome}</p>
              <div className="badge bg-primary">{configs.empresa.nif}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-puzzle text-success fs-3"></i>
              </div>
              <h5>Módulos Ativos</h5>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <span className="h3 me-2">{modulosAtivos}</span>
                <span className="text-muted">/ {totalModulos}</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${percentualAtivos}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-shield-check text-warning fs-3"></i>
              </div>
              <h5>Segurança</h5>
              <p className="text-muted small">
                {configs.seguranca.twoFactor ? '2FA Ativo' : '2FA Inativo'}
              </p>
              <div className="badge bg-warning">
                Nível: {configs.seguranca.twoFactor ? 'Alto' : 'Médio'}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="bg-purple bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-calculator text-purple fs-3"></i>
              </div>
              <h5>Contabilidade</h5>
              <p className="text-muted small">
                {configs.contabilidade.reconciliacaoAuto ? 'Auto' : 'Manual'}
              </p>
              <div className="badge bg-purple">
                {configs.contabilidade.planoContas}
              </div>
            </div>
          </div>
        </div>

        {/* Exportar/Importar */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Backup de Configurações</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                <button 
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                  onClick={exportConfigs}
                >
                  <i className="bi bi-download me-2 fs-5"></i>
                  Exportar Configurações (JSON)
                </button>
                
                <label className="btn btn-outline-secondary d-flex align-items-center justify-content-center">
                  <i className="bi bi-upload me-2 fs-5"></i>
                  Importar Configurações
                  <input 
                    type="file" 
                    className="d-none" 
                    accept=".json" 
                    onChange={handleImport}
                  />
                </label>
              </div>
              
              <div className="mt-4">
                <h6>Informações de Backup</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Última Atualização</span>
                    <span className="text-muted">Hoje</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tamanho Configurações</span>
                    <span className="text-muted">
                      {Math.round(JSON.stringify(configs).length / 1024)} KB
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Backup Automático</span>
                    <span className="badge bg-success">Ativo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Módulos Ativos */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Módulos do Sistema</h5>
              <span className="badge bg-primary">{modulosAtivos} ativos</span>
            </div>
            <div className="card-body">
              <div className="row">
                {[
                  { id: 'faturacao', label: 'Faturação', icon: 'receipt' },
                  { id: 'contabilidade', label: 'Contabilidade', icon: 'calculator' },
                  { id: 'tesouraria', label: 'Tesouraria', icon: 'cash-coin' },
                  { id: 'ativos', label: 'Ativos Fixos', icon: 'building' },
                  { id: 'rh', label: 'Recursos Humanos', icon: 'people' },
                  { id: 'projetos', label: 'Projetos', icon: 'clipboard-data' },
                  { id: 'inventario', label: 'Inventário', icon: 'boxes' },
                  { id: 'crm', label: 'CRM', icon: 'person-lines-fill' },
                ].map(modulo => (
                  <div className="col-6 mb-2" key={modulo.id}>
                    <div className="d-flex align-items-center">
                      <div className={`p-2 rounded-circle me-2 ${configs.modulos.ativos.includes(modulo.id) ? 'bg-success' : 'bg-secondary'}`}>
                        <i className={`bi bi-${modulo.icon} text-white`}></i>
                      </div>
                      <div>
                        <div className="fw-medium">{modulo.label}</div>
                        <div className="small">
                          {configs.modulos.ativos.includes(modulo.id) ? (
                            <span className="text-success">
                              <i className="bi bi-check-circle me-1"></i>
                              Ativo
                            </span>
                          ) : (
                            <span className="text-muted">
                              <i className="bi bi-x-circle me-1"></i>
                              Inativo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Configurações Ativas em Detalhe */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Configurações Ativas por Módulo</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Módulo</th>
                      <th>Configurações Ativas</th>
                      <th>Status</th>
                      <th>Última Alteração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i className="bi bi-receipt me-2 text-primary"></i>
                        Faturação
                      </td>
                      <td>
                        {configs.faturacao.formatos.length} formatos, 
                        {configs.faturacao.criacaoAutomatica ? ' Auto' : ' Manual'}
                      </td>
                      <td>
                        <span className="badge bg-success">Configurado</span>
                      </td>
                      <td>Hoje</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="bi bi-calculator me-2 text-purple"></i>
                        Contabilidade
                      </td>
                      <td>
                        {configs.contabilidade.planoContas}, 
                        {configs.contabilidade.reconciliacaoAuto ? ' Auto' : ' Manual'}
                      </td>
                      <td>
                        <span className="badge bg-success">Configurado</span>
                      </td>
                      <td>Hoje</td>
                    </tr>
                    <tr>
                      <td>
                        <i className="bi bi-shield-check me-2 text-warning"></i>
                        Segurança
                      </td>
                      <td>
                        {configs.seguranca.twoFactor ? '2FA' : 'Sem 2FA'}, 
                        Sessão: {configs.seguranca.sessionTimeout}min
                      </td>
                      <td>
                        <span className="badge bg-success">Configurado</span>
                      </td>
                      <td>Hoje</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConfig;