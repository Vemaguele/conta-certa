import React from "react"

const BanksPage = () => {
  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-4">Bancos</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Gestão Bancária</h5>
          <p className="text-muted">
            Contas bancárias, extratos, reconciliação.
          </p>
          <a href="/" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Voltar ao Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

export default BanksPage
