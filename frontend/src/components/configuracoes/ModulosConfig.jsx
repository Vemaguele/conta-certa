// src/components/configuracoes/ModulosConfig.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const ModulosConfig = () => {
  const { user, hasPermission } = useAuth();
  const [modules, setModules] = useState({
    ativos: ['faturacao', 'contabilidade', 'tesouraria'],
    fluxosPersonalizados: true,
    integracaoBancos: false,
    assinaturasEletronicas: true,
    bancosIntegrados: ['CGD', 'BPI', 'Santander'],
    fluxosTrabalho: {
      aprovacaoFaturas: 'Fluxo Simples',
      processamentoPagamentos: 'Automático',
      encerramentoMensal: 'Assistido'
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Verificar permissões (apenas admin - nível 1 pode configurar)
  const isAdmin = user?.role === 'admin';
  const userLevel = user?.role === 'admin' ? 1 : user?.role === 'manager' ? 2 : 3;

  // Lista completa de módulos com informações de nível de acesso
  const allModules = [
    { 
      id: 'faturacao', 
      label: 'Faturação', 
      icon: 'receipt',
      descricao: 'Gestão de faturas, recibos e notas de crédito',
      nivel: 2, // Manager pode aceder
      cor: 'primary',
      dependencias: ['clientes', 'contabilidade']
    },
    { 
      id: 'contabilidade', 
      label: 'Contabilidade', 
      icon: 'calculator',
      descricao: 'Plano de contas, lançamentos, balancetes',
      nivel: 2,
      cor: 'success',
      dependencias: []
    },
    { 
      id: 'tesouraria', 
      label: 'Tesouraria', 
      icon: 'cash-coin',
      descricao: 'Caixa, fluxos de caixa, reconciliação',
      nivel: 2,
      cor: 'info',
      dependencias: ['bancos', 'contabilidade']
    },
    { 
      id: 'ativos', 
      label: 'Ativos Fixos', 
      icon: 'building',
      descricao: 'Gestão de imobilizado e depreciações',
      nivel: 2,
      cor: 'warning',
      dependencias: ['contabilidade']
    },
    { 
      id: 'rh', 
      label: 'Recursos Humanos', 
      icon: 'people',
      descricao: 'Funcionários, folha de pagamento, benefícios',
      nivel: 1, // Apenas admin
      cor: 'danger',
      dependencias: ['contabilidade']
    },
    { 
      id: 'projetos', 
      label: 'Projetos', 
      icon: 'clipboard-data',
      descricao: 'Gestão de projetos e tarefas',
      nivel: 2,
      cor: 'secondary',
      dependencias: []
    },
    { 
      id: 'inventario', 
      label: 'Inventário', 
      icon: 'boxes',
      descricao: 'Controlo de stocks e armazéns',
      nivel: 3, // Todos podem aceder
      cor: 'dark',
      dependencias: ['compras']
    },
    { 
      id: 'crm', 
      label: 'CRM', 
      icon: 'person-lines-fill',
      descricao: 'Gestão de relacionamento com clientes',
      nivel: 3,
      cor: 'info',
      dependencias: []
    },
    { 
      id: 'compras', 
      label: 'Compras', 
      icon: 'cart',
      descricao: 'Gestão de compras e fornecedores',
      nivel: 2,
      cor: 'success',
      dependencias: ['inventario']
    },
    { 
      id: 'clientes', 
      label: 'Clientes', 
      icon: 'people',
      descricao: 'Cadastro e gestão de clientes',
      nivel: 3,
      cor: 'primary',
      dependencias: []
    },
    { 
      id: 'bancos', 
      label: 'Bancos', 
      icon: 'bank',
      descricao: 'Integração com contas bancárias',
      nivel: 1,
      cor: 'warning',
      dependencias: ['contabilidade']
    }
  ];

  // Lista de bancos disponíveis para integração
  const bancosDisponiveis = [
    { id: 'cgd', nome: 'CGD', icon: 'bank' },
    { id: 'bpi', nome: 'BPI', icon: 'bank2' },
    { id: 'santander', nome: 'Santander', icon: 'bank' },
    { id: 'millennium', nome: 'Millennium', icon: 'bank2' },
    { id: 'novo_banco', nome: 'Novo Banco', icon: 'bank' },
    { id: 'montepio', nome: 'Montepio', icon: 'bank2' },
    { id: 'bic', nome: 'BIC', icon: 'bank' },
    { id: 'standard', nome: 'Standard Bank', icon: 'bank2' }
  ];

  // Opções para fluxos de trabalho
  const fluxosOptions = {
    aprovacaoFaturas: [
      'Fluxo Simples',
      'Fluxo com Validação Financeira',
      'Fluxo Multi-departamental',
      'Fluxo com Aprovação Hierárquica'
    ],
    processamentoPagamentos: [
      'Automático',
      'Com Aprovação',
      'Agendado',
      'Manual com Validação'
    ],
    encerramentoMensal: [
      'Manual',
      'Assistido',
      'Automático',
      'Com Checklist Obrigatório'
    ]
  };

  // Carregar configuração salva
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('modulos_config_completo');
      if (savedConfig) {
        setModules(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  }, []);

  // Guardar configuração
  const saveConfig = () => {
    try {
      localStorage.setItem('modulos_config_completo', JSON.stringify(modules));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Toggle módulo
  const toggleModule = (moduleId) => {
    if (!isAdmin) {
      alert('Apenas administradores podem alterar a configuração de módulos');
      return;
    }

    setModules(prev => {
      const isActive = prev.ativos.includes(moduleId);
      let newAtivos;

      if (isActive) {
        // Verificar dependências antes de desativar
        const dependentes = allModules
          .filter(m => m.dependencias.includes(moduleId))
          .map(m => m.id);
        
        const dependentesAtivos = dependentes.filter(d => prev.ativos.includes(d));
        
        if (dependentesAtivos.length > 0) {
          const nomesDependentes = dependentesAtivos
            .map(id => allModules.find(m => m.id === id)?.label)
            .join(', ');
          
          alert(`Não pode desativar este módulo pois os seguintes módulos dependem dele: ${nomesDependentes}`);
          return prev;
        }
        
        newAtivos = prev.ativos.filter(m => m !== moduleId);
      } else {
        newAtivos = [...prev.ativos, moduleId];
      }

      return { ...prev, ativos: newAtivos };
    });
  };

  // Toggle banco integrado
  const toggleBanco = (bancoNome) => {
    if (!isAdmin) return;

    setModules(prev => {
      const isIntegrated = prev.bancosIntegrados.includes(bancoNome);
      let newBancos;
      
      if (isIntegrated) {
        newBancos = prev.bancosIntegrados.filter(b => b !== bancoNome);
      } else {
        newBancos = [...prev.bancosIntegrados, bancoNome];
      }
      
      return { ...prev, bancosIntegrados: newBancos };
    });
  };

  // Atualizar fluxo de trabalho
  const updateFluxo = (campo, valor) => {
    if (!isAdmin) return;
    
    setModules(prev => ({
      ...prev,
      fluxosTrabalho: {
        ...prev.fluxosTrabalho,
        [campo]: valor
      }
    }));
  };

  // Obter badge de nível
  const getNivelBadge = (nivel) => {
    switch(nivel) {
      case 1: return <span className="badge bg-danger">Nível 1</span>;
      case 2: return <span className="badge bg-warning">Nível 2</span>;
      case 3: return <span className="badge bg-info">Nível 3</span>;
      default: return null;
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* Cabeçalho */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
            <i className="bi bi-puzzle text-info fs-4"></i>
          </div>
          <div>
            <h3 className="h4 mb-1">Configuração de Módulos</h3>
            <p className="text-muted mb-0">
              Ative e personalize os módulos do sistema • 
              Seu nível: {getNivelBadge(userLevel)}
            </p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mt-2 mt-sm-0">
            <span className="badge bg-danger me-2">Admin</span>
            <button 
              className="btn btn-primary"
              onClick={saveConfig}
            >
              <i className="bi bi-check-lg me-2"></i>
              Salvar Configuração
            </button>
          </div>
        )}
      </div>

      {/* Alertas */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          Configuração salva com sucesso!
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      {showError && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Erro ao salvar configuração. Tente novamente.
          <button type="button" className="btn-close" onClick={() => setShowError(false)}></button>
        </div>
      )}

      {!isAdmin && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-info-circle-fill me-2"></i>
          Apenas administradores (Nível 1) podem alterar as configurações dos módulos.
          Os restantes utilizadores podem apenas visualizar.
        </div>
      )}

      <div className="row">
        {/* Coluna da esquerda - Módulos Disponíveis */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                Módulos Disponíveis
              </h5>
              <small className="text-muted">
                {modules.ativos.length} de {allModules.length} ativos
              </small>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {allModules.map(module => {
                  const isActive = modules.ativos.includes(module.id);
                  const podeAceder = userLevel <= module.nivel;
                  
                  return (
                    <div className="col-md-6" key={module.id}>
                      <div className={`card h-100 ${isActive ? `border-${module.cor} border-2` : 'border'}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div className="d-flex align-items-center">
                              <div className={`p-2 rounded-circle me-2 ${
                                isActive ? `bg-${module.cor} bg-opacity-10` : 'bg-secondary bg-opacity-10'
                              }`}>
                                <i className={`bi bi-${module.icon} ${
                                  isActive ? `text-${module.cor}` : 'text-secondary'
                                }`}></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{module.label}</h6>
                                <small className="text-muted">{getNivelBadge(module.nivel)}</small>
                              </div>
                            </div>
                            
                            {isAdmin ? (
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={isActive}
                                  onChange={() => toggleModule(module.id)}
                                  disabled={!isAdmin}
                                />
                              </div>
                            ) : (
                              <span className={`badge bg-${isActive ? 'success' : 'secondary'}`}>
                                {isActive ? 'Ativo' : 'Inativo'}
                              </span>
                            )}
                          </div>
                          
                          <p className="small text-muted mb-2">
                            {module.descricao}
                          </p>
                          
                          {module.dependencias.length > 0 && (
                            <div className="mt-2">
                              <small className="text-muted">
                                <i className="bi bi-link-45deg me-1"></i>
                                Depende de: {module.dependencias.map(dep => 
                                  allModules.find(m => m.id === dep)?.label
                                ).join(', ')}
                              </small>
                            </div>
                          )}
                          
                          {!podeAceder && isActive && (
                            <div className="mt-2">
                              <small className="text-warning">
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                O seu nível de acesso não permite usar este módulo
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da direita - Personalizações */}
        <div className="col-lg-4 mb-4">
          <div className="row">
            {/* Personalizações Gerais */}
            <div className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">
                    <i className="bi bi-sliders2 me-2"></i>
                    Personalizações Gerais
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={modules.fluxosPersonalizados}
                        onChange={(e) => isAdmin && setModules({...modules, fluxosPersonalizados: e.target.checked})}
                        disabled={!isAdmin}
                      />
                      <label className="form-check-label">
                        <strong>Personalização de fluxos de trabalho</strong>
                        <small className="d-block text-muted">Permite criar fluxos personalizados</small>
                      </label>
                    </div>
                    
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={modules.integracaoBancos}
                        onChange={(e) => isAdmin && setModules({...modules, integracaoBancos: e.target.checked})}
                        disabled={!isAdmin}
                      />
                      <label className="form-check-label">
                        <strong>Integração com bancos</strong>
                        <small className="d-block text-muted">Ativa integração automática com bancos</small>
                      </label>
                    </div>
                    
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={modules.assinaturasEletronicas}
                        onChange={(e) => isAdmin && setModules({...modules, assinaturasEletronicas: e.target.checked})}
                        disabled={!isAdmin}
                      />
                      <label className="form-check-label">
                        <strong>Assinaturas eletrónicas</strong>
                        <small className="d-block text-muted">Permite assinatura digital de documentos</small>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bancos Integrados */}
            {modules.integracaoBancos && (
              <div className="col-12 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="bi bi-bank2 me-2"></i>
                      Bancos Integrados
                    </h5>
                    <span className="badge bg-primary">{modules.bancosIntegrados.length} ativos</span>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {bancosDisponiveis.map(banco => (
                        <button
                          key={banco.id}
                          className={`btn btn-sm ${
                            modules.bancosIntegrados.includes(banco.nome) 
                              ? 'btn-primary' 
                              : 'btn-outline-secondary'
                          }`}
                          onClick={() => toggleBanco(banco.nome)}
                          disabled={!isAdmin}
                        >
                          <i className={`bi bi-${banco.icon} me-1`}></i>
                          {banco.nome}
                        </button>
                      ))}
                    </div>
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      Selecione os bancos para integração automática
                    </small>
                  </div>
                </div>
              </div>
            )}

            {/* Resumo de Ativação */}
            <div className="col-12">
              <div className="card border-0 shadow-sm bg-light">
                <div className="card-body">
                  <h6 className="mb-3">
                    <i className="bi bi-pie-chart me-2"></i>
                    Resumo de Ativação
                  </h6>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <span>Módulos Ativos</span>
                      <span className="fw-bold">{modules.ativos.length}/{allModules.length}</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-success" 
                        style={{ width: `${(modules.ativos.length / allModules.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <small className="text-muted d-block">
                      <i className="bi bi-shield-check me-1"></i>
                      Nível de acesso: {getNivelBadge(userLevel)}
                    </small>
                    <small className="text-muted d-block mt-1">
                      <i className="bi bi-diagram-3 me-1"></i>
                      {modules.fluxosPersonalizados ? 'Fluxos personalizados ativos' : 'Fluxos padrão'}
                    </small>
                    <small className="text-muted d-block mt-1">
                      <i className="bi bi-bank me-1"></i>
                      {modules.bancosIntegrados.length} bancos integrados
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secção de Fluxos de Trabalho */}
        {modules.fluxosPersonalizados && (
          <div className="col-12 mt-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-diagram-2 me-2"></i>
                  Configuração de Fluxos de Trabalho
                </h5>
                {!isAdmin && <span className="badge bg-warning">Visualização apenas</span>}
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                            <i className="bi bi-file-text text-primary"></i>
                          </div>
                          <h6 className="mb-0">Aprovação de Faturas</h6>
                        </div>
                        <select 
                          className="form-select"
                          value={modules.fluxosTrabalho.aprovacaoFaturas}
                          onChange={(e) => updateFluxo('aprovacaoFaturas', e.target.value)}
                          disabled={!isAdmin}
                        >
                          {fluxosOptions.aprovacaoFaturas.map(opt => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                        <small className="text-muted d-block mt-2">
                          Define o fluxo de aprovação para faturas
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-success bg-opacity-10 p-2 rounded-circle me-2">
                            <i className="bi bi-cash text-success"></i>
                          </div>
                          <h6 className="mb-0">Processamento de Pagamentos</h6>
                        </div>
                        <select 
                          className="form-select"
                          value={modules.fluxosTrabalho.processamentoPagamentos}
                          onChange={(e) => updateFluxo('processamentoPagamentos', e.target.value)}
                          disabled={!isAdmin}
                        >
                          {fluxosOptions.processamentoPagamentos.map(opt => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                        <small className="text-muted d-block mt-2">
                          Controla como os pagamentos são processados
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-2">
                            <i className="bi bi-calendar-check text-warning"></i>
                          </div>
                          <h6 className="mb-0">Encerramento Mensal</h6>
                        </div>
                        <select 
                          className="form-select"
                          value={modules.fluxosTrabalho.encerramentoMensal}
                          onChange={(e) => updateFluxo('encerramentoMensal', e.target.value)}
                          disabled={!isAdmin}
                        >
                          {fluxosOptions.encerramentoMensal.map(opt => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                        <small className="text-muted d-block mt-2">
                          Define o processo de fecho contabilístico
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulosConfig;