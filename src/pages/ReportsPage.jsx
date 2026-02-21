import React from "react"

const ReportsPage = () => {
  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-4">Relatórios</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Relatórios Contabilísticos</h5>
          <p className="text-muted">
            Balanços, demonstrações de resultados, relatórios fiscais.
          </p>
          <div className="mt-3">
            <a href="/" className="btn btn-primary">
              <i className="bi bi-arrow-left me-2"></i>
              Voltar ao Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage

