import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import DashboardConfig from '../components/configuracoes/DashboardConfig'; // ← minúsculo
// ====================== COMPONENTE PRINCIPAL ======================
const ConfiguracoesSistema = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'speedometer2' },
    { id: 'empresa', label: 'Empresa', icon: 'building' },
    { id: 'faturacao', label: 'Faturação', icon: 'receipt' },
    { id: 'imposto', label: 'Imposto', icon: 'cash-stack' },
    { id: 'seguranca', label: 'Segurança', icon: 'shield-lock' },
    { id: 'modulos', label: 'Módulos', icon: 'puzzle' },
    { id: 'contabilidade', label: 'Contabilidade', icon: 'calculator' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardConfig />;
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
        return <DashboardConfig />;
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="mb-4">
        <h1 className="h2 fw-bold text-gray-800 mb-2">
          <i className="bi bi-gear-fill me-2"></i>
          Configurações do Sistema
        </h1>
        <p className="text-muted">
          Configure todos os aspectos do sistema contabilístico
        </p>
      </div>

      <div className="row">
        {/* Coluna das abas */}
        <div className="col-lg-3 col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="mb-0">
                <i className="bi bi-menu-button-wide me-2"></i>
                Seções de Configuração
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`list-group-item list-group-item-action d-flex align-items-center ${
                    activeTab === tab.id ? 'active bg-primary text-white' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`bi bi-${tab.icon} me-3`}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna do conteúdo */}
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

// ====================== COMPONENTE EMPRESA ======================
const EmpresaConfig = () => {
  const { configs, updateConfig } = useConfig();
  const empresaData = configs.empresa;

  const handleChange = (field, value) => {
    updateConfig('empresa', { [field]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateConfig('empresa', { certificadoDigital: file.name });
    }
  };


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('empresa', { logotipo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

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
        {/* SEÇÃO LOGOTIPO - ADICIONADA */}
        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Logotipo da Empresa</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                {empresaData.logotipo ? (
                  <div className="text-center">
                    <img 
                      src={empresaData.logotipo} 
                      alt="Logotipo" 
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: '150px', maxWidth: '100%' }}
                    />
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => updateConfig('empresa', { logotipo: null })}
                    >
                      <i className="bi bi-trash me-1"></i> Remover
                    </button>
                  </div>
                ) : (
                  <div className="border rounded p-5 text-center">
                    <i className="bi bi-image text-muted fs-1 mb-3"></i>
                    <p className="text-muted">Nenhum logotipo carregado</p>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Upload de Logotipo</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <small className="text-muted">Formatos suportados: .png, .jpg, .jpeg, .svg (max: 2MB)</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Dados Fiscais e Legais </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Nome da Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  value={empresaData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
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
                    onChange={(e) => handleChange('nif', e.target.value)}
                    placeholder="Número de identificação fiscal"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Atividade Principal (CAE)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={empresaData.atividade}
                    onChange={(e) => handleChange('atividade', e.target.value)}
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
                    onChange={(e) => handleChange('anoFiscal', e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Período Fiscal</label>
                  <select
                    className="form-select"
                    value={empresaData.periodoFiscal}
                    onChange={(e) => handleChange('periodoFiscal', e.target.value)}
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
                  <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileUpload}
                  />
                  {empresaData.certificadoDigital && (
                    <div className="mt-2">
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle me-1"></i>
                        {empresaData.certificadoDigital}
                      </span>
                    </div>
                  )}
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
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações da empresa guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

// ====================== COMPONENTE FATURAÇÃO ======================
const FaturacaoConfig = () => {
  const { configs, updateConfig } = useConfig();
  const faturacaoData = configs.faturacao;

  const handleToggle = (field, value) => {
    updateConfig('faturacao', { [field]: value });
  };

  const handleFormatosChange = (format, checked) => {
    const newFormatos = checked
      ? [...faturacaoData.formatos, format]
      : faturacaoData.formatos.filter(f => f !== format);
    
    updateConfig('faturacao', { formatos: newFormatos });
  };

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
                  checked={faturacaoData.criacaoAutomatica}
                  onChange={(e) => handleToggle('criacaoAutomatica', e.target.checked)}
                />
                <label className="form-check-label">Ativar criação automática</label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Fontes de Dados</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={faturacaoData.importERP}
                    onChange={(e) => handleToggle('importERP', e.target.checked)}
                  />
                  <label className="form-check-label">Importação de sistemas ERP</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={faturacaoData.gerarDeContratos}
                    onChange={(e) => handleToggle('gerarDeContratos', e.target.checked)}
                  />
                  <label className="form-check-label">Geração a partir de contratos</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={faturacaoData.sincEcommerce}
                    onChange={(e) => handleToggle('sincEcommerce', e.target.checked)}
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
                  value={faturacaoData.fluxoAprovacao}
                  onChange={(e) => handleToggle('fluxoAprovacao', e.target.value)}
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
                  checked={faturacaoData.alertasAnomalias}
                  onChange={(e) => handleToggle('alertasAnomalias', e.target.checked)}
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
                              checked={faturacaoData.formatos.includes(format)}
                              onChange={(e) => handleFormatosChange(format, e.target.checked)}
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
                        checked={faturacaoData.envioEmail}
                        onChange={(e) => handleToggle('envioEmail', e.target.checked)}
                      />
                      <label className="form-check-label">Envio por email</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={faturacaoData.blockchain}
                        onChange={(e) => handleToggle('blockchain', e.target.checked)}
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

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações de faturação guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

// ====================== COMPONENTE IMPOSTO ======================
const ImpostoConfig = () => {
  const { configs, updateConfig } = useConfig();
  const impostoData = configs.imposto;

  const handleChange = (field, value) => {
    updateConfig('imposto', { [field]: value });
  };

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
                  value={impostoData.ivaRate}
                  onChange={(e) => handleChange('ivaRate', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Período de Declaração</label>
                <select
                  className="form-select"
                  value={impostoData.vatPeriod}
                  onChange={(e) => handleChange('vatPeriod', e.target.value)}
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
                  checked={impostoData.autoDeclaration}
                  onChange={(e) => handleChange('autoDeclaration', e.target.checked)}
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
                  checked={impostoData.irsWithholding}
                  onChange={(e) => handleChange('irsWithholding', e.target.checked)}
                />
                <label className="form-check-label">Aplicar retenção na fonte (IRS)</label>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Taxa de Retenção (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value="25"
                  disabled={!impostoData.irsWithholding}
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

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações de impostos guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

// ====================== COMPONENTE SEGURANÇA ======================
const SegurancaConfig = () => {
  const { configs, updateConfig } = useConfig();
  const segurancaData = configs.seguranca;

  const handleChange = (field, value) => {
    updateConfig('seguranca', { [field]: value });
  };

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
                  checked={segurancaData.twoFactor}
                  onChange={(e) => handleChange('twoFactor', e.target.checked)}
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
                  value={segurancaData.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="480"
                />
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={segurancaData.ipRestriction}
                  onChange={(e) => handleChange('ipRestriction', e.target.checked)}
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
                  checked={segurancaData.rbacEnabled}
                  onChange={(e) => handleChange('rbacEnabled', e.target.checked)}
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
                  checked={segurancaData.auditLogs}
                  onChange={(e) => handleChange('auditLogs', e.target.checked)}
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

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações de segurança guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

// ====================== COMPONENTE MÓDULOS ======================
const ModulosConfig = () => {
  const { configs, updateConfig } = useConfig();
  const modulosData = configs.modulos;

  const handleModuleToggle = (moduleId, checked) => {
    const newAtivos = checked
      ? [...modulosData.ativos, moduleId]
      : modulosData.ativos.filter(m => m !== moduleId);
    
    updateConfig('modulos', { ativos: newAtivos });
  };

  const handleToggle = (field, value) => {
    updateConfig('modulos', { [field]: value });
  };

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
                    <div className={`card ${modulosData.ativos.includes(module.id) ? 'border-primary' : ''}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="d-flex align-items-center mb-2">
                              <div className={`p-2 rounded-circle me-3 ${modulosData.ativos.includes(module.id) ? 'bg-primary' : 'bg-secondary'}`}>
                                <i className={`bi bi-${module.icon} text-white`}></i>
                              </div>
                              <h6 className="mb-0">{module.label}</h6>
                            </div>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={modulosData.ativos.includes(module.id)}
                              onChange={(e) => handleModuleToggle(module.id, e.target.checked)}
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
                  checked={modulosData.fluxosPersonalizados}
                  onChange={(e) => handleToggle('fluxosPersonalizados', e.target.checked)}
                />
                <label className="form-check-label">Personalização de fluxos de trabalho</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modulosData.integracaoBancos}
                  onChange={(e) => handleToggle('integracaoBancos', e.target.checked)}
                />
                <label className="form-check-label">Integração com bancos</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modulosData.assinaturasEletronicas}
                  onChange={(e) => handleToggle('assinaturasEletronicas', e.target.checked)}
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

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações de módulos guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

// ====================== COMPONENTE CONTABILIDADE ======================
const ContabilidadeConfig = () => {
  const { configs, updateConfig } = useConfig();
  const contabilidadeData = configs.contabilidade;

  const handleChange = (field, value) => {
    updateConfig('contabilidade', { [field]: value });
  };

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
                  value={contabilidadeData.planoContas}
                  onChange={(e) => handleChange('planoContas', e.target.value)}
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
                  checked={contabilidadeData.reconciliacaoAuto}
                  onChange={(e) => handleChange('reconciliacaoAuto', e.target.checked)}
                />
                <label className="form-check-label">Reconciliação automática ativa</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={contabilidadeData.importExtratos}
                  onChange={(e) => handleChange('importExtratos', e.target.checked)}
                />
                <label className="form-check-label">Importação automática de extratos</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={contabilidadeData.mlSugestoes}
                  onChange={(e) => handleChange('mlSugestoes', e.target.checked)}
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
                  checked={contabilidadeData.diariosAuto}
                  onChange={(e) => handleChange('diariosAuto', e.target.checked)}
                />
                <label className="form-check-label">Sistema de diários automatizados</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={contabilidadeData.lancamentosRecorrentes}
                  onChange={(e) => handleChange('lancamentosRecorrentes', e.target.checked)}
                />
                <label className="form-check-label">Lançamentos recorrentes programáveis</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={contabilidadeData.integracaoRH}
                  onChange={(e) => handleChange('integracaoRH', e.target.checked)}
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
                  checked={contabilidadeData.checklistAuto}
                  onChange={(e) => handleChange('checklistAuto', e.target.checked)}
                />
                <label className="form-check-label">Checklist automatizado</label>
              </div>
              
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={contabilidadeData.iaFechoContas}
                  onChange={(e) => handleChange('iaFechoContas', e.target.checked)}
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

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary">
          <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </button>
        <button 
          className="btn btn-primary"
          onClick={() => alert('Configurações de contabilidade guardadas!')}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar Configurações
        </button>
      </div>
    </div>
  );
};

export default ConfiguracoesSistema;