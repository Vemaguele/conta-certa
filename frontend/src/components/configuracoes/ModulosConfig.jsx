// src/components/configuracoes/ModulosConfig.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const ModulosConfig = () => {
  const { user } = useAuth();
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

  const isAdmin = user?.role === 'admin';
  const userLevel = user?.role === 'admin' ? 1 : user?.role === 'manager' ? 2 : 3;

  // Lista completa de módulos
  const allModules = [
    { id: 'faturacao', label: 'Faturação', descricao: 'Gestão de faturas, recibos e notas de crédito', nivel: 2, cor: 'primary', dependencias: ['clientes', 'contabilidade'] },
    { id: 'contabilidade', label: 'Contabilidade', descricao: 'Plano de contas, lançamentos, balancetes', nivel: 2, cor: 'success', dependencias: [] },
    { id: 'tesouraria', label: 'Tesouraria', descricao: 'Caixa, fluxos de caixa, reconciliação', nivel: 2, cor: 'info', dependencias: ['bancos', 'contabilidade'] },
    { id: 'ativos', label: 'Ativos Fixos', descricao: 'Gestão de imobilizado e depreciações', nivel: 2, cor: 'warning', dependencias: ['contabilidade'] },
    { id: 'rh', label: 'Recursos Humanos', descricao: 'Funcionários, folha de pagamento', nivel: 1, cor: 'danger', dependencias: ['contabilidade'] },
    { id: 'projetos', label: 'Projetos', descricao: 'Gestão de projetos e tarefas', nivel: 2, cor: 'secondary', dependencias: [] },
    { id: 'inventario', label: 'Inventário', descricao: 'Controlo de stocks e armazéns', nivel: 3, cor: 'dark', dependencias: ['compras'] },
    { id: 'crm', label: 'CRM', descricao: 'Gestão de relacionamento com clientes', nivel: 3, cor: 'info', dependencias: [] },
    { id: 'compras', label: 'Compras', descricao: 'Gestão de compras e fornecedores', nivel: 2, cor: 'success', dependencias: ['inventario'] },
    { id: 'clientes', label: 'Clientes', descricao: 'Cadastro e gestão de clientes', nivel: 3, cor: 'primary', dependencias: [] },
    { id: 'bancos', label: 'Bancos', descricao: 'Integração com contas bancárias', nivel: 1, cor: 'warning', dependencias: ['contabilidade'] }
  ];

  const bancosDisponiveis = [
    { id: 'cgd', nome: 'CGD' },
    { id: 'bpi', nome: 'BPI' },
    { id: 'santander', nome: 'Santander' },
    { id: 'millennium', nome: 'Millennium' },
    { id: 'novo_banco', nome: 'Novo Banco' }
  ];

  const fluxosOptions = {
    aprovacaoFaturas: ['Fluxo Simples', 'Fluxo com Validação Financeira', 'Fluxo Multi-departamental'],
    processamentoPagamentos: ['Automático', 'Com Aprovação', 'Agendado'],
    encerramentoMensal: ['Manual', 'Assistido', 'Automático']
  };

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

  const toggleModule = (moduleId) => {
    if (!isAdmin) {
      alert('Apenas administradores podem alterar a configuração de módulos');
      return;
    }

    setModules(prev => {
      const isActive = prev.ativos.includes(moduleId);
      let newAtivos;

      if (isActive) {
        const dependentes = allModules
          .filter(m => m.dependencias.includes(moduleId))
          .map(m => m.id);
        
        const dependentesAtivos = dependentes.filter(d => prev.ativos.includes(d));
        
        if (dependentesAtivos.length > 0) {
          const nomesDependentes = dependentesAtivos
            .map(id => allModules.find(m => m.id === id)?.label)
            .join(', ');
          
          alert(`Não pode desativar este módulo pois depende de: ${nomesDependentes}`);
          return prev;
        }
        
        newAtivos = prev.ativos.filter(m => m !== moduleId);
      } else {
        newAtivos = [...prev.ativos, moduleId];
      }

      return { ...prev, ativos: newAtivos };
    });
  };

  const toggleBanco = (bancoNome) => {
    if (!isAdmin) return;
    setModules(prev => ({
      ...prev,
      bancosIntegrados: prev.bancosIntegrados.includes(bancoNome)
        ? prev.bancosIntegrados.filter(b => b !== bancoNome)
        : [...prev.bancosIntegrados, bancoNome]
    }));
  };

  const updateFluxo = (campo, valor) => {
    if (!isAdmin) return;
    setModules(prev => ({
      ...prev,
      fluxosTrabalho: { ...prev.fluxosTrabalho, [campo]: valor }
    }));
  };

  const getNivelBadge = (nivel) => {
    switch(nivel) {
      case 1: return <span className="badge bg-danger">Nível 1</span>;
      case 2: return <span className="badge bg-warning">Nível 2</span>;
      case 3: return <span className="badge bg-info">Nível 3</span>;
      default: return null;
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h4 mb-1">⚙️ Configuração de Módulos</h3>
          <p className="text-muted mb-0">
            Ative e personalize os módulos do sistema • 
            {getNivelBadge(userLevel)}
          </p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={saveConfig}>
            💾 Salvar Configuração
          </button>
        )}
      </div>

      {/* Alertas */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mb-4">
          ✅ Configuração salva com sucesso!
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      {!isAdmin && (
        <div className="alert alert-warning mb-4">
          ℹ️ Apenas administradores (Nível 1) podem alterar configurações.
        </div>
      )}

      <div className="row">
        {/* Módulos Disponíveis */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">📦 Módulos Disponíveis</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {allModules.map(module => {
                  const isActive = modules.ativos.includes(module.id);
                  return (
                    <div className="col-md-6" key={module.id}>
                      <div className={`card h-100 ${isActive ? `border-${module.cor} border-2` : ''}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{module.label}</h6>
                              <small className="text-muted d-block mb-2">{module.descricao}</small>
                              {getNivelBadge(module.nivel)}
                            </div>
                            {isAdmin ? (
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={isActive}
                                  onChange={() => toggleModule(module.id)}
                                />
                              </div>
                            ) : (
                              <span className={`badge bg-${isActive ? 'success' : 'secondary'}`}>
                                {isActive ? 'Ativo' : 'Inativo'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Personalizações */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">⚙️ Personalizações</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modules.fluxosPersonalizados}
                  onChange={(e) => isAdmin && setModules({...modules, fluxosPersonalizados: e.target.checked})}
                  disabled={!isAdmin}
                />
                <label className="form-check-label">
                  <strong>Fluxos personalizados</strong>
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
                  <strong>Integração bancária</strong>
                </label>
              </div>
            </div>
          </div>

          {/* Bancos */}
          {modules.integracaoBancos && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">🏦 Bancos</h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  {bancosDisponiveis.map(banco => (
                    <button
                      key={banco.id}
                      className={`btn btn-sm ${
                        modules.bancosIntegrados.includes(banco.nome) ? 'btn-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => toggleBanco(banco.nome)}
                      disabled={!isAdmin}
                    >
                      {banco.nome}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resumo */}
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h6 className="mb-3">📊 Resumo</h6>
              <div className="mb-2">
                <div className="d-flex justify-content-between mb-1">
                  <span>Módulos Ativos</span>
                  <span className="fw-bold">{modules.ativos.length}/{allModules.length}</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar bg-success" 
                    style={{ width: `${(modules.ativos.length / allModules.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fluxos de Trabalho */}
        {modules.fluxosPersonalizados && (
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">🔄 Fluxos de Trabalho</h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <h6>Aprovação de Faturas</h6>
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
                  </div>
                  <div className="col-md-4">
                    <h6>Processamento de Pagamentos</h6>
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
                  </div>
                  <div className="col-md-4">
                    <h6>Encerramento Mensal</h6>
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