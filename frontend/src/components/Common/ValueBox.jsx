import React from 'react'

const ValueBox = ({ title, value, change, icon, color = 'primary', subtitle = null }) => {
  const colorClass = color || 'primary'
  const isPositive = change && change.startsWith('+')
  
  return (
    <div className={`value-box ${colorClass}`}>
      <div className={`value-icon ${colorClass}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="value-content">
        <div className="value-title">{title}</div>
        <div className="value-number">{value}</div>
        {subtitle && (
          <div className="value-subtitle text-muted small">{subtitle}</div>
        )}
        {change && (
          <div className={`value-change ${isPositive ? 'positive' : 'negative'}`}>
            <i className={`bi ${isPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`}></i>
            {change}
          </div>
        )}
      </div>
    </div>
  )
}

export default ValueBox