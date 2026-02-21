// src/components/dashboard/MetricCard.jsx
import React from 'react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  color = 'primary', 
  icon, 
  subtitle,
  loading = false 
}) => {
  const colorClasses = {
    primary: { bg: 'bg-primary', text: 'text-primary' },
    success: { bg: 'bg-success', text: 'text-success' },
    warning: { bg: 'bg-warning', text: 'text-warning' },
    danger: { bg: 'bg-danger', text: 'text-danger' },
    info: { bg: 'bg-info', text: 'text-info' }
  };

  const isPositive = change && change.startsWith('+');
  const changeClass = isPositive ? 'text-success' : 'text-danger';
  const changeIcon = isPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right';

  return (
    <div className="metric-card card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="card-subtitle text-muted mb-2">
              <i className={`bi ${icon} me-1`}></i>
              {title}
            </h6>
            {loading ? (
              <div className="placeholder-glow">
                <h3 className="card-title placeholder col-8"></h3>
              </div>
            ) : (
              <h3 className="card-title fw-bold mb-1">{value}</h3>
            )}
            
            {subtitle && (
              <p className="card-text small text-muted mb-2">{subtitle}</p>
            )}
            
            {change && !loading && (
              <div className={`small fw-semibold ${changeClass}`}>
                <i className={`bi ${changeIcon} me-1`}></i>
                {change}
              </div>
            )}
          </div>
          
          <div className={`icon-container ${colorClasses[color].bg} text-white rounded-circle p-2`}>
            <i className={`bi ${icon} fs-5`}></i>
          </div>
        </div>
      </div>
      
      {/* Barra de progresso na parte inferior */}
      <div className="card-footer border-0 bg-transparent pt-0">
        <div className="progress" style={{ height: '4px' }}>
          <div 
            className={`progress-bar ${colorClasses[color].bg.replace('bg-', 'bg-')}`}
            style={{ width: '75%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;