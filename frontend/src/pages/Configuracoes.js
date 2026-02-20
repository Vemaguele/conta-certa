import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('empresa');

  const tabs = [
    { id: 'empresa', label: 'Empresa' },
    { id: 'faturacao', label: 'Faturação' },
    { id: 'imposto', label: 'Imposto' },
    { id: 'seguranca', label: 'Segurança' },
    { id: 'modulos', label: 'Configuração de Módulos' },
    { id: 'contabilidade', label: 'Contabilidade' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'empresa':
        return <EmpresaConfig />;
      case 'faturacao':
        return <FaturacaoConfig />;
      case 'imposto':
        return <ImpostoConfig />;
      case 'seguranca':
        return <SegurancaConfig />;
      case 'modulos':
        return <ModulosConfig />;
      case 'contabilidade':
        return <ContabilidadeConfig />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <i className="bi bi-gear-fill me-3"></i>
          Configurações do Sistema
        </h1>
        <p className="text-gray-600">
          Configure todos os aspectos do sistema contabilístico
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">
                <i className="bi bi-menu-button-wide me-2"></i>
                Seções de Configuração
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`list-group-item list-group-item-action d-flex align-items-center ${
                    activeTab === tab.id ? 'active bg-primary text-white' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi bi-${getTabIcon(tab.id)} me-3`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="col-lg-9 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for tab icons
const getTabIcon = (tabId) => {
  const icons = {
    empresa: 'building',
    faturacao: 'receipt',
    imposto: 'cash-stack',
    seguranca: 'shield-lock',
    modulos: 'puzzle',
    contabilidade: 'calculator',
  };
  return icons[tabId] || 'gear';
};

// ====================== COMPONENTES INDIVIDUAIS ======================

const EmpresaConfig = () => {
  const [empresaData, setEmpresaData] = useState({
    nome: '',
    nif: '',
    atividade: '',
    email: '',
    telefone: '',
    endereco: '',
    codigoPostal: '',
    localidade: '',
    anoFiscal: new Date().getFullYear(),
    periodoFiscal: 'mensal',
    certificadoDigital: null,
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-building text-primary fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configurações da Empresa</h3>
          <p className="text-muted mb-0">Dados fiscais, legais e configuração do exercício</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Dados Fiscais e Legais</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Nome da Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  value={empresaData.nome}
                  onChange={(e) => setEmpresaData({...empresaData, nome: e.target.value})}
                  placeholder="Nome completo da empresa"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">NIF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={empresaData.nif}
                    onChange={(e) => setEmpresaData({...empresaData, nif: e.target.value})}
                    placeholder="Número de identificação fiscal"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Atividade Principal (CAE)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={empresaData.atividade}
                    onChange={(e) => setEmpresaData({...empresaData, atividade: e.target.value})}
                    placeholder="Código de atividade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Exercício Contabilístico</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ano Fiscal</label>
                  <input
                    type="number"
                    className="form-control"
                    value={empresaData.anoFiscal}
                    onChange={(e) => setEmpresaData({...empresaData, anoFiscal: e.target.value})}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Período Fiscal</label>
                  <select
                    className="form-select"
                    value={empresaData.periodoFiscal}
                    onChange={(e) => setEmpresaData({...empresaData, periodoFiscal: e.target.value})}
                  >
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="semestral">Semestral</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Definição de Períodos Fiscais</label>
                <button className="btn btn-outline-primary btn-sm w-100">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Configurar Períodos
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Certificados Digitais</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Faça upload dos certificados digitais para assinatura eletrónica de documentos
              </div>
              <div className="mb-3">
                <label className="form-label">Upload de Certificado Digital</label>
                <div className="border rounded p-4 text-center">
                  <i className="bi bi-file-earmark-lock fs-1 text-muted mb-3"></i>
                  <p className="text-muted">Arraste ou clique para fazer upload do certificado</p>
                  <input type="file" className="form-control" />
                  <small className="text-muted">Formatos suportados: .pfx, .p12</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button className="btn btn-primary">
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

const FaturacaoConfig = () => {
  const [configs, setConfigs] = useState({
    criacaoAutomatica: true,
    importERP: true,
    gerarDeContratos: true,
    sincEcommerce: false,
    fluxoAprovacao: 'simples',
    alertasAnomalias: true,
    formatos: ['pdf', 'xml'],
    envioEmail: true,
    blockchain: false,
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-receipt text-success fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configurações de Faturação</h3>
          <p className="text-muted mb-0">Automação, validação e emissão de faturas</p>
        </div>
      </div>

      <div className="row">
        {/* Criação Automática */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Criação Automática de Faturas</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={configs.criacaoAutomatica}
                  onChange={(e) => setConfigs({...configs, criacaoAutomatica: e.target.checked})}
                />
                <label className="form-check-label">Ativar criação automática</label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Fontes de Dados</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={configs.importERP}
                    onChange={(e) => setConfigs({...configs, importERP: e.target.checked})}
                  />
                  <label className="form-check-label">Importação de sistemas ERP</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={configs.gerarDeContratos}
                    onChange={(e) => setConfigs({...configs, gerarDeContratos: e.target.checked})}
                  />
                  <label className="form-check-label">Geração a partir de contratos</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={configs.sincEcommerce}
                    onChange={(e) => setConfigs({...configs, sincEcommerce: e.target.checked})}
                  />
                  <label className="form-check-label">Sincronização com e-commerce</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validação e Aprovação */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Validação e Aprovação</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Fluxo de Aprovação</label>
                <select
                  className="form-select"
                  value={configs.fluxoAprovacao}
                  onChange={(e) => setConfigs({...configs, fluxoAprovacao: e.target.value})}
                >
                  <option value="simples">Aprovação Simples</option>
                  <option value="dupla">Aprovação Dupla</option>
                  <option value="multinivel">Aprovação Multi-nível</option>
                </select>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={configs.alertasAnomalias}
                  onChange={(e) => setConfigs({...configs, alertasAnomalias: e.target.checked})}
                />
                <label className="form-check-label">Alertas para anomalias</label>
              </div>
              
              <div className="alert alert-warning">
                <i className="bi bi-shield-check me-2"></i>
                Verificação automática de conformidade legal ativa
              </div>
            </div>
          </div>
        </div>

        {/* Emissão e Entrega */}
        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Emissão e Entrega</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Formatos de Geração</label>
                    <div className="row">
                      {['pdf', 'xml', 'ubl', 'json'].map(format => (
                        <div className="col-6" key={format}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={configs.formatos.includes(format)}
                              onChange={(e) => {
                                const newFormatos = e.target.checked
                                  ? [...configs.formatos, format]
                                  : configs.formatos.filter(f => f !== format);
                                setConfigs({...configs, formatos: newFormatos});
                              }}
                            />
                            <label className="form-check-label text-uppercase">{format}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Envio Automático</label>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={configs.envioEmail}
                        onChange={(e) => setConfigs({...configs, envioEmail: e.target.checked})}
                      />
                      <label className="form-check-label">Envio por email</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={configs.blockchain}
                        onChange={(e) => setConfigs({...configs, blockchain: e.target.checked})}
                      />
                      <label className="form-check-label">Armazenamento em blockchain</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Plataformas de Upload</label>
                <div className="d-flex gap-2 flex-wrap">
                  {['e-Fatura', 'SAF-T', 'AT', 'eFatura PT'].map(platform => (
                    <button key={platform} className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-cloud-upload me-2"></i>
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImpostoConfig = () => {
  const [taxConfig, setTaxConfig] = useState({
    ivaRate: 23,
    irsWithholding: true,
    vatPeriod: 'trimestral',
    autoDeclaration: false,
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-cash-stack text-warning fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configurações de Impostos</h3>
          <p className="text-muted mb-0">Parâmetros fiscais e declarações</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">IVA / VAT</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Taxa de IVA Padrão (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={taxConfig.ivaRate}
                  onChange={(e) => setTaxConfig({...taxConfig, ivaRate: e.target.value})}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Período de Declaração</label>
                <select
                  className="form-select"
                  value={taxConfig.vatPeriod}
                  onChange={(e) => setTaxConfig({...taxConfig, vatPeriod: e.target.value})}
                >
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="semestral">Semestral</option>
                </select>
              </div>
              
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={taxConfig.autoDeclaration}
                  onChange={(e) => setTaxConfig({...taxConfig, autoDeclaration: e.target.checked})}
                />
                <label className="form-check-label">Declaração automática de IVA</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Retenções na Fonte</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={taxConfig.irsWithholding}
                  onChange={(e) => setTaxConfig({...taxConfig, irsWithholding: e.target.checked})}
                />
                <label className="form-check-label">Aplicar retenção na fonte (IRS)</label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Taxa de Retenção (%)</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue="25"
                  disabled={!taxConfig.irsWithholding}
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Configure as regras de retenção na fonte para diferentes tipos de serviços
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Regimes Especiais</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {['IVA de Caixa', 'Isenções Artigos', 'Regime Simplificado', 'Agricultura'].map(regime => (
                  <div className="col-md-3 mb-2" key={regime}>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id={regime} />
                      <label className="form-check-label" htmlFor={regime}>{regime}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SegurancaConfig = () => {
  const [security, setSecurity] = useState({
    twoFactor: true,
    ipRestriction: false,
    sessionTimeout: 30,
    auditLogs: true,
    rbacEnabled: true,
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-shield-lock text-danger fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configurações de Segurança</h3>
          <p className="text-muted mb-0">Controlo de acessos, autenticação e auditoria</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Autenticação</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={security.twoFactor}
                  onChange={(e) => setSecurity({...security, twoFactor: e.target.checked})}
                />
                <label className="form-check-label">
                  <i className="bi bi-shield-check me-2"></i>
                  Autenticação de dois fatores (2FA)
                </label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Tempo de Sessão (minutos)</label>
                <input
                  type="number"
                  className="form-control"
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                  min="5"
                  max="480"
                />
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={security.ipRestriction}
                  onChange={(e) => setSecurity({...security, ipRestriction: e.target.checked})}
                />
                <label className="form-check-label">Restrição por IP</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Controlo de Acessos</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={security.rbacEnabled}
                  onChange={(e) => setSecurity({...security, rbacEnabled: e.target.checked})}
                />
                <label className="form-check-label">
                  <i className="bi bi-people me-2"></i>
                  RBAC - Controlo por função
                </label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Perfis de Utilizador</label>
                <button className="btn btn-outline-primary btn-sm w-100">
                  <i className="bi bi-person-gear me-2"></i>
                  Gerir Perfis e Permissões
                </button>
              </div>
              
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={security.auditLogs}
                  onChange={(e) => setSecurity({...security, auditLogs: e.target.checked})}
                />
                <label className="form-check-label">
                  <i className="bi bi-clipboard-data me-2"></i>
                  Logs de auditoria ativos
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Assinatura Digital e Certificados</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Certificados Digitais</label>
                    <div className="list-group">
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Certificado de Assinatura Digital</span>
                        <span className="badge bg-success">Ativo</span>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span>Certificado para e-Fatura</span>
                        <span className="badge bg-warning">Expira em 30 dias</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Horários de Acesso</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-clock"></i>
                      </span>
                      <input type="time" className="form-control" defaultValue="09:00" />
                      <span className="input-group-text">às</span>
                      <input type="time" className="form-control" defaultValue="18:00" />
                    </div>
                    <small className="text-muted">Horário permitido para acesso</small>
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

const ModulosConfig = () => {
  const [modules, setModules] = useState({
    ativos: ['faturacao', 'contabilidade', 'tesouraria'],
    fluxosPersonalizados: true,
    integracaoBancos: false,
    assinaturasEletronicas: true,
  });

  const allModules = [
    { id: 'faturacao', label: 'Faturação', icon: 'receipt' },
    { id: 'contabilidade', label: 'Contabilidade', icon: 'calculator' },
    { id: 'tesouraria', label: 'Tesouraria', icon: 'cash-coin' },
    { id: 'ativos', label: 'Ativos Fixos', icon: 'building' },
    { id: 'rh', label: 'Recursos Humanos', icon: 'people' },
    { id: 'projetos', label: 'Projetos', icon: 'clipboard-data' },
    { id: 'inventario', label: 'Inventário', icon: 'boxes' },
    { id: 'crm', label: 'CRM', icon: 'person-lines-fill' },
  ];

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-puzzle text-info fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configuração de Módulos</h3>
          <p className="text-muted mb-0">Ative e personalize os módulos do sistema</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Módulos Disponíveis</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {allModules.map(module => (
                  <div className="col-md-6 mb-3" key={module.id}>
                    <div className={`card ${modules.ativos.includes(module.id) ? 'border-primary' : ''}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="d-flex align-items-center mb-2">
                              <div className={`p-2 rounded-circle me-3 ${modules.ativos.includes(module.id) ? 'bg-primary' : 'bg-secondary'}`}>
                                <i className={`bi bi-${module.icon} text-white`}></i>
                              </div>
                              <h6 className="mb-0">{module.label}</h6>
                            </div>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={modules.ativos.includes(module.id)}
                              onChange={(e) => {
                                const newAtivos = e.target.checked
                                  ? [...modules.ativos, module.id]
                                  : modules.ativos.filter(m => m !== module.id);
                                setModules({...modules, ativos: newAtivos});
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Personalização</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modules.fluxosPersonalizados}
                  onChange={(e) => setModules({...modules, fluxosPersonalizados: e.target.checked})}
                />
                <label className="form-check-label">Personalização de fluxos de trabalho</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modules.integracaoBancos}
                  onChange={(e) => setModules({...modules, integracaoBancos: e.target.checked})}
                />
                <label className="form-check-label">Integração com bancos</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modules.assinaturasEletronicas}
                  onChange={(e) => setModules({...modules, assinaturasEletronicas: e.target.checked})}
                />
                <label className="form-check-label">Assinaturas eletrónicas</label>
              </div>
              
              <div className="mt-4">
                <h6>Bancos Integrados</h6>
                <div className="d-flex flex-wrap gap-2">
                  {['CGD', 'BPI', 'Santander', 'Millennium', 'Novo Banco'].map(banco => (
                    <span key={banco} className="badge bg-secondary">{banco}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Configuração de Fluxos de Trabalho</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>Aprovação de Faturas</h6>
                      <select className="form-select">
                        <option>Fluxo Simples</option>
                        <option>Fluxo com Validação Financeira</option>
                        <option>Fluxo Multi-departamental</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>Processamento de Pagamentos</h6>
                      <select className="form-select">
                        <option>Automático</option>
                        <option>Com Aprovação</option>
                        <option>Agendado</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h6>Encerramento Mensal</h6>
                      <select className="form-select">
                        <option>Manual</option>
                        <option>Assistido</option>
                        <option>Automático</option>
                      </select>
                    </div>
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

const ContabilidadeConfig = () => {
  const [accounting, setAccounting] = useState({
    planoContas: 'PT-POC',
    reconciliacaoAuto: true,
    importExtratos: true,
    mlSugestoes: false,
    diariosAuto: true,
    lancamentosRecorrentes: true,
    integracaoRH: false,
    checklistAuto: true,
    iaFechoContas: false,
  });

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <div className="bg-purple bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-calculator text-purple fs-4"></i>
        </div>
        <div>
          <h3 className="h4 mb-1">Configurações de Contabilidade</h3>
          <p className="text-muted mb-0">Plano de contas, reconciliação e encerramento</p>
        </div>
      </div>

      <div className="row">
        {/* Plano de Contas */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Plano de Contas</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Modelo de Plano de Contas</label>
                <select
                  className="form-select"
                  value={accounting.planoContas}
                  onChange={(e) => setAccounting({...accounting, planoContas: e.target.value})}
                >
                  <option value="PT-POC">POC - Plano Oficial de Contas (Portugal)</option>
                  <option value="IFRS">IFRS - Normas Internacionais</option>
                  <option value="custom">Personalizado</option>
                  <option value="SNC">SNC - Sistema de Normalização Contabilística</option>
                </select>
              </div>
              
              <button className="btn btn-outline-primary w-100 mb-3">
                <i className="bi bi-diagram-3 me-2"></i>
                Visualizar Estrutura de Contas
              </button>
              
              <button className="btn btn-outline-secondary w-100">
                <i className="bi bi-upload me-2"></i>
                Importar Plano de Contas
              </button>
            </div>
          </div>
        </div>

        {/* Reconciliação Automática */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Reconciliação Automática</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.reconciliacaoAuto}
                  onChange={(e) => setAccounting({...accounting, reconciliacaoAuto: e.target.checked})}
                />
                <label className="form-check-label">Reconciliação automática ativa</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.importExtratos}
                  onChange={(e) => setAccounting({...accounting, importExtratos: e.target.checked})}
                />
                <label className="form-check-label">Importação automática de extratos</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.mlSugestoes}
                  onChange={(e) => setAccounting({...accounting, mlSugestoes: e.target.checked})}
                />
                <label className="form-check-label">Sugestões baseadas em Machine Learning</label>
              </div>
              
              <div className="alert alert-info">
                <i className="bi bi-lightbulb me-2"></i>
                Correspondência inteligente entre faturas e extratos bancários
              </div>
            </div>
          </div>
        </div>

        {/* Lançamentos Contabilísticos */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Lançamentos Contabilísticos</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.diariosAuto}
                  onChange={(e) => setAccounting({...accounting, diariosAuto: e.target.checked})}
                />
                <label className="form-check-label">Sistema de diários automatizados</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.lancamentosRecorrentes}
                  onChange={(e) => setAccounting({...accounting, lancamentosRecorrentes: e.target.checked})}
                />
                <label className="form-check-label">Lançamentos recorrentes programáveis</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.integracaoRH}
                  onChange={(e) => setAccounting({...accounting, integracaoRH: e.target.checked})}
                />
                <label className="form-check-label">Integração com folha de pagamentos</label>
              </div>
              
              <button className="btn btn-outline-primary btn-sm w-100">
                <i className="bi bi-clock-history me-2"></i>
                Configurar Lançamentos Recorrentes
              </button>
            </div>
          </div>
        </div>

        {/* Encerramento Periódico */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Encerramento Periódico</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.checklistAuto}
                  onChange={(e) => setAccounting({...accounting, checklistAuto: e.target.checked})}
                />
                <label className="form-check-label">Checklist automatizado</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={accounting.iaFechoContas}
                  onChange={(e) => setAccounting({...accounting, iaFechoContas: e.target.checked})}
                />
                <label className="form-check-label">Fecho de contas assistido por IA</label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Relatórios de Reconciliação</label>
                <select className="form-select">
                  <option>Automático Mensal</option>
                  <option>Após Encerramento</option>
                  <option>Sob Demanda</option>
                </select>
              </div>
              
              <button className="btn btn-outline-warning btn-sm w-100">
                <i className="bi bi-file-earmark-check me-2"></i>
                Executar Checklist de Encerramento
              </button>
            </div>
          </div>
        </div>

        {/* Configurações Adicionais */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Configurações Avançadas</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Moeda Base</label>
                  <select className="form-select">
                    <option>EUR - Euro</option>
                    <option>USD - Dólar Americano</option>
                    <option>GBP - Libra Esterlina</option>
                  </select>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label">Idioma dos Relatórios</label>
                  <select className="form-select">
                    <option>Português</option>
                    <option>Inglês</option>
                    <option>Espanhol</option>
                  </select>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label">Formato de Datas</label>
                  <select className="form-select">
                    <option>DD/MM/AAAA</option>
                    <option>MM/DD/AAAA</option>
                    <option>AAAA-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;