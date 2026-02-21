// Funções utilitárias para formatação
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-PT').format(new Date(date))
}

export const formatInvoiceNumber = (number) => {
  return `FAT-${new Date().getFullYear()}-${String(number).padStart(3, '0')}`
}

export const calculateIVA = (amount, rate = 0.23) => {
  return amount * rate
}

export const calculateTotalWithIVA = (amount, rate = 0.23) => {
  return amount * (1 + rate)
}