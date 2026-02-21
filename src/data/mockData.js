// Dados de exemplo para desenvolvimento
export const mockInvoices = [
  {
    id: 1,
    number: 'FAT-2024-001',
    client: 'Cliente Exemplo S.A.',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    amount: 1250.00,
    vat: 287.50,
    total: 1537.50,
    status: 'paid',
    items: [
      { description: 'Serviço de Consultoria', quantity: 10, price: 100.00 },
      { description: 'Licença Software', quantity: 1, price: 250.00 }
    ]
  },
  // ... mais dados
]

export const mockClients = [
  {
    id: 1,
    name: 'Cliente Exemplo S.A.',
    email: 'cliente@exemplo.pt',
    phone: '+351 123 456 789',
    nif: '123456789',
    address: 'Rua Exemplo, 123, Lisboa',
    status: 'active'
  }
]

export const summaryData = {
  monthlyRevenue: 45280.50,
  pendingAmount: 18750.00,
  vatToPay: 8452.30,
  netProfit: 12450.20
}