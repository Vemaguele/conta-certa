// src/components/dashboard/MetricsGrid.jsx
import React from 'react';
import MetricCard from './MetricCard';

const MetricsGrid = () => {
  const metricsData = [
    {
      id: 1,
      title: 'Faturação Total',
      value: '€ 45.280,50',
      change: '+12.5%',
      color: 'success',
      icon: 'bi-graph-up-arrow',
      subtitle: 'vs mês anterior'
    },
    {
      id: 2,
      title: 'Pendente Cobrança',
      value: '€ 18.750,00',
      change: '-5.2%',
      color: 'warning',
      icon: 'bi-clock-history',
      subtitle: '12 faturas'
    },
    {
      id: 3,
      title: 'IVA a Pagar',
      value: '€ 8.452,30',
      change: '+8.3%',
      color: 'danger',
      icon: 'bi-cash-coin',
      subtitle: 'próximo vencimento: 15/02'
    },
    {
      id: 4,
      title: 'Resultado Líquido',
      value: '€ 12.450,20',
      change: '+15.7%',
      color: 'info',
      icon: 'bi-check-circle',
      subtitle: 'margem: 27.5%'
    },
    {
      id: 5,
      title: 'Clientes Ativos',
      value: '42',
      change: '+8%',
      color: 'primary',
      icon: 'bi-people',
      subtitle: 'vs trimestre anterior'
    },
    {
      id: 6,
      title: 'Fornecedores',
      value: '28',
      change: '+3.7%',
      color: 'secondary',
      icon: 'bi-building',
      subtitle: 'registados este ano'
    }
  ];

  return (
    <div className="metrics-grid">
      <div className="row g-3">
        {metricsData.map(metric => (
          <div key={metric.id} className="col-xl-4 col-lg-6 col-md-6">
            <MetricCard {...metric} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;