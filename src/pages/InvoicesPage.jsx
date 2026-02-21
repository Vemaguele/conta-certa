import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NovaFatura from '../components/faturacao/NovaFatura';

const InvoicesPage = () => {
  const [showNovaFatura, setShowNovaFatura] = useState(false);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-0">
            <i className="bi bi-receipt me-2"></i>
            Faturação
          </h1>
          <p className="text-muted mb-0">Gerir faturas e documentos fiscais</p>
        </div>
        
        <div className="d-flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={() => setShowNovaFatura(!showNovaFatura)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            {showNovaFatura ? 'Ver Faturas' : 'Nova Fatura'}
          </button>
          
          <button className="btn btn-outline-secondary">
            <i className="bi bi-filter me-2"></i>
            Filtros
          </button>
        </div>
      </div>

      {showNovaFatura ? (
        <NovaFatura />
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>Lista de Faturas</h5>
            <p className="text-muted">As faturas criadas aparecerão aqui...</p>
            <div className="text-center py-4">
              <i className="bi bi-file-earmark-text fs-1 text-muted mb-3"></i>
              <p>Nenhuma fatura criada ainda.</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowNovaFatura(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Criar Primeira Fatura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;