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