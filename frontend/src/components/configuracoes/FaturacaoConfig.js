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