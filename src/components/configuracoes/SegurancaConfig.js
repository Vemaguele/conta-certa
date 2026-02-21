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