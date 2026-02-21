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