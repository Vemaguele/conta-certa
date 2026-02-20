// src/pages/SuppliersPage.jsx - VERSÃO CORRIGIDA
import React from 'react'

const SuppliersPage = () => {
  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold mb-4">Fornecedores</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Gestão de Fornecedores</h5>
          <p className="text-muted">
            Cadastro de fornecedores, faturas de compras, pagamentos.
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

export default SuppliersPage