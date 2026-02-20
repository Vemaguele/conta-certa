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