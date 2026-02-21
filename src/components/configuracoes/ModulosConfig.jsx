import React, { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthContext'

const ModulosConfig = () => {
  const { user, isAdmin, getUserLevel } = useAuth()
  const [modules, setModules] = useState({
    ativos: ['faturacao', 'contabilidade', 'tesouraria', 'clientes', 'fornecedores', 'relatorios'],
    fluxosPersonalizados: true,
    integracaoBancos: false,
    assinaturasEletronicas: true,
    bancosIntegrados: ['CGD', 'BPI', 'Santander', 'Millennium'],
    fluxosTrabalho: {
      aprovacaoFaturas: 'Fluxo Simples',
      processamentoPagamentos: 'Automático',
      encerramentoMensal: 'Assistido'
    }
  })

  const [showSuccess, setShowSuccess] = useState(false)

  // Todos os módulos disponíveis
  const allModules = [
    { id: 'faturacao', label: 'Faturação', icon: 'receipt', nivel: 2, cor: 'primary', desc: 'Gestão de faturas, recibos e NC' },
    { id: 'contabilidade', label: 'Contabilidade', icon: 'calculator', nivel: 2, cor: 'success', desc: 'Plano de contas, lançamentos' },
    { id: 'tesouraria', label: 'Tesouraria', icon: 'cash-stack', nivel: 2, cor: 'info', desc: 'Caixa, fluxos, reconciliação' },
    { id: 'clientes', label: 'Clientes', icon: 'people', nivel: 3, cor: 'primary', desc: 'Gestão de clientes' },
    { id: 'fornecedores', label: 'Fornecedores', icon: 'building', nivel: 2, cor: 'warning', desc: 'Gestão de fornecedores' },
    { id: 'bancos', label: 'Bancos', icon: 'bank', nivel: 1, cor: 'warning', desc: 'Integração bancária' },
    { id: 'impostos', label: 'IVA/Impostos', icon: 'percent', nivel: 1, cor: 'danger', desc: 'Gestão de impostos' },
    { id: 'rh', label: 'RH/Folha', icon: 'people', nivel: 1, cor: 'danger', desc: 'Recursos humanos' },
    { id: 'inventario', label: 'Inventário', icon: 'boxes', nivel: 3, cor: 'dark', desc: 'Controlo de stocks' },
    { id: 'compras', label: 'Compras', icon: 'cart', nivel: 2, cor: 'success', desc: 'Gestão de compras' },
    { id: 'crm', label: 'CRM', icon: 'person-lines-fill', nivel: 3, cor: 'info', desc: 'Relacionamento clientes' },
    { id: 'projetos', label: 'Projetos', icon: 'kanban', nivel: 2, cor: 'secondary', desc: 'Gestão de projetos' }
  ]

  const bancosDisponiveis = ['CGD', 'BPI', 'Santander', 'Millennium', 'Novo Banco', 'Montepio', 'BIC', 'Standard Bank']

  useEffect(() => {
    const saved = localStorage.getItem('modulos_config')
    if (saved) setModules(JSON.parse(saved))
  }, [])

  const saveConfig = () => {
    localStorage.setItem('modulos_config', JSON.stringify(modules))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const toggleModule = (moduleId) => {
    if (!isAdmin) return alert('Apenas administradores podem alterar módulos')
    setModules(prev => ({
      ...prev,
      ativos: prev.ativos.includes(moduleId)
        ? prev.ativos.filter(m => m !== moduleId)
        : [...prev.ativos, moduleId]
    }))
  }

  const toggleBanco = (banco) => {
    if (!isAdmin) return
    setModules(prev => ({
      ...prev,
      bancosIntegrados: prev.bancosIntegrados.includes(banco)
        ? prev.bancosIntegrados.filter(b => b !== banco)
        : [...prev.bancosIntegrados, banco]
    }))
  }

  const getNivelBadge = (nivel) => {
    const badges = {
      1: <span className="badge bg-danger">Nível 1</span>,
      2: <span className="badge bg-warning">Nível 2</span>,
      3: <span className="badge bg-info">Nível 3</span>
    }
    return badges[nivel]
  }

  return (
    <div className="container-fluid py-4">
      {/* Cabeçalho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="h4 mb-1">
            <i className="bi bi-puzzle me-2 text-primary"></i>
            Configuração de Módulos
          </h3>
          <p className="text-muted mb-0">
            Ative e personalize os módulos • Seu nível: {getNivelBadge(getUserLevel())}
          </p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={saveConfig}>
            <i className="bi bi-check-lg me-2"></i>
            Salvar Configuração
          </button>
        )}
      </div>

      {/* Alerta de sucesso */}
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show mb-4">
          <i className="bi bi-check-circle-fill me-2"></i>
          Configuração salva com sucesso!
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
        </div>
      )}

      {/* Aviso para não-admin */}
      {!isAdmin && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-info-circle-fill me-2"></i>
          Apenas administradores (Nível 1) podem alterar configurações.
        </div>
      )}

      <div className="row">
        {/* Módulos Disponíveis */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                Módulos Disponíveis
                <span className="badge bg-primary ms-2">{modules.ativos.length}/{allModules.length}</span>
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {allModules.map(module => {
                  const isActive = modules.ativos.includes(module.id)
                  return (
                    <div className="col-md-6" key={module.id}>
                      <div className={`card h-100 ${isActive ? `border-${module.cor} border-2` : ''}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <div className={`p-2 rounded-circle me-2 bg-${module.cor} bg-opacity-10`}>
                                <i className={`bi bi-${module.icon} text-${module.cor}`}></i>
                              </div>
                              <div>
                                <h6 className="mb-1">{module.label}</h6>
                                <small className="text-muted d-block">{module.desc}</small>
                                {getNivelBadge(module.nivel)}
                              </div>
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
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Painel Lateral */}
        <div className="col-lg-4">
          {/* Personalizações */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-sliders2 me-2"></i>
                Personalizações
              </h5>
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
                  <small className="d-block text-muted">Crie fluxos de trabalho customizados</small>
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
                  <small className="d-block text-muted">Conciliação automática com bancos</small>
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={modules.assinaturasEletronicas}
                  onChange={(e) => isAdmin && setModules({...modules, assinaturasEletronicas: e.target.checked})}
                  disabled={!isAdmin}
                />
                <label className="form-check-label">
                  <strong>Assinaturas eletrónicas</strong>
                  <small className="d-block text-muted">Assinatura digital de documentos</small>
                </label>
              </div>
            </div>
          </div>

          {/* Bancos Integrados (se ativo) */}
          {modules.integracaoBancos && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-bank me-2"></i>
                  Bancos Integrados
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-2">
                  {bancosDisponiveis.map(banco => (
                    <button
                      key={banco}
                      className={`btn btn-sm ${modules.bancosIntegrados.includes(banco) ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => toggleBanco(banco)}
                      disabled={!isAdmin}
                    >
                      {banco}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resumo */}
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h6 className="mb-3">
                <i className="bi bi-pie-chart me-2"></i>
                Resumo
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
              <small className="text-muted d-block mt-2">
                <i className="bi bi-shield-check me-1"></i>
                Nível de acesso: {getNivelBadge(getUserLevel())}
              </small>
              <small className="text-muted d-block">
                <i className="bi bi-bank me-1"></i>
                {modules.bancosIntegrados.length} bancos integrados
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Fluxos de Trabalho (se ativo) */}
      {modules.fluxosPersonalizados && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-diagram-2 me-2"></i>
                  Fluxos de Trabalho
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <label className="fw-bold mb-2">Aprovação de Faturas</label>
                    <select 
                      className="form-select"
                      value={modules.fluxosTrabalho.aprovacaoFaturas}
                      onChange={(e) => setModules({
                        ...modules, 
                        fluxosTrabalho: {...modules.fluxosTrabalho, aprovacaoFaturas: e.target.value}
                      })}
                      disabled={!isAdmin}
                    >
                      <option>Fluxo Simples</option>
                      <option>Fluxo com Validação Financeira</option>
                      <option>Fluxo Multi-departamental</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold mb-2">Processamento de Pagamentos</label>
                    <select 
                      className="form-select"
                      value={modules.fluxosTrabalho.processamentoPagamentos}
                      onChange={(e) => setModules({
                        ...modules, 
                        fluxosTrabalho: {...modules.fluxosTrabalho, processamentoPagamentos: e.target.value}
                      })}
                      disabled={!isAdmin}
                    >
                      <option>Automático</option>
                      <option>Com Aprovação</option>
                      <option>Agendado</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="fw-bold mb-2">Encerramento Mensal</label>
                    <select 
                      className="form-select"
                      value={modules.fluxosTrabalho.encerramentoMensal}
                      onChange={(e) => setModules({
                        ...modules, 
                        fluxosTrabalho: {...modules.fluxosTrabalho, encerramentoMensal: e.target.value}
                      })}
                      disabled={!isAdmin}
                    >
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
      )}
    </div>
  )
}

export default ModulosConfig