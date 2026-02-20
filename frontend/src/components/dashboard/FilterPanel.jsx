// src/components/dashboard/FilterPanel.jsx
import React, { useState } from 'react';

const FilterPanel = () => {
  const [filters, setFilters] = useState({
    period: 'monthly',
    documentType: 'all',
    status: 'all',
    client: '',
    dateRange: {
      start: new Date(),
      end: new Date()
    }
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    // Em produção, aqui você dispararia uma atualização nos dados
    console.log('Filtro alterado:', filterName, value);
  };

  return (
    <div className="filter-panel card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filtrar Dados
        </h5>
      </div>
      <div className="card-body">
        
        {/* Período */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-calendar3 me-1"></i>
            Período
          </label>
          <select 
            className="form-select form-select-sm"
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
          >
            <option value="monthly">Este Mês</option>
            <option value="quarterly">Este Trimestre</option>
            <option value="yearly">Este Ano</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>

        {/* Tipo de Documento */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-file-text me-1"></i>
            Tipo de Documento
          </label>
          <select 
            className="form-select form-select-sm"
            value={filters.documentType}
            onChange={(e) => handleFilterChange('documentType', e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="invoice">Faturas</option>
            <option value="receipt">Recibos</option>
            <option value="credit_note">Notas de Crédito</option>
          </select>
        </div>

        {/* Estado */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-circle-fill me-1"></i>
            Estado
          </label>
          <select 
            className="form-select form-select-sm"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="paid">Pago</option>
            <option value="pending">Pendente</option>
            <option value="overdue">Vencido</option>
          </select>
        </div>

        {/* Cliente */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            <i className="bi bi-person me-1"></i>
            Cliente
          </label>
          <select 
            className="form-select form-select-sm"
            value={filters.client}
            onChange={(e) => handleFilterChange('client', e.target.value)}
          >
            <option value="">Todos os Clientes</option>
            <option value="client1">Cliente Exemplo S.A.</option>
            <option value="client2">Empresa Teste Lda</option>
            <option value="client3">Outro Cliente</option>
          </select>
        </div>

        {/* Toggle Switch - Apenas Pendentes */}
        <div className="form-check form-switch mb-3">
          <input 
            className="form-check-input"
            type="checkbox"
            id="pendingOnly"
            checked={filters.status === 'pending'}
            onChange={(e) => handleFilterChange('status', e.target.checked ? 'pending' : 'all')}
          />
          <label className="form-check-label" htmlFor="pendingOnly">
            Apenas pendentes
          </label>
        </div>

        {/* Botão de Reset */}
        <button 
          className="btn btn-outline-secondary btn-sm w-100"
          onClick={() => setFilters({
            period: 'monthly',
            documentType: 'all',
            status: 'all',
            client: '',
            dateRange: { start: new Date(), end: new Date() }
          })}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Limpar Filtros
        </button>

      </div>
    </div>
  );
};

export default FilterPanel;