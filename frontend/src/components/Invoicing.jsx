// 2. MÓDULO DE FATURAÇÃO
const InvoicingLayout = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="p-6">
      {/* Cabeçalho com Tabs */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Faturação</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nova Fatura
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-8">
            <TabButton active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
              Lista de Faturas
            </TabButton>
            <TabButton active={activeTab === 'drafts'} onClick={() => setActiveTab('drafts')}>
              Rascunhos
            </TabButton>
            <TabButton active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>
              Pendentes
            </TabButton>
            <TabButton active={activeTab === 'recurring'} onClick={() => setActiveTab('recurring')}>
              Recorrentes
            </TabButton>
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <select className="border rounded-lg px-3 py-2">
            <option>Todos os Estados</option>
            <option>Emitida</option>
            <option>Pendente</option>
            <option>Paga</option>
          </select>
          
          <input 
            type="date" 
            className="border rounded-lg px-3 py-2"
            placeholder="Data inicial"
          />
          
          <input 
            type="date" 
            className="border rounded-lg px-3 py-2"
            placeholder="Data final"
          />
          
          <input 
            type="text" 
            className="border rounded-lg px-3 py-2 flex-1"
            placeholder="Pesquisar cliente, número..."
          />
          
          <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
            🔍
          </button>
        </div>
      </div>

      {/* Tabela de Faturas */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <input type="checkbox" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map(invoice => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginação */}
        <Pagination />
      </div>

      {/* Resumo Lateral (opcional para layout split) */}
      <div className="hidden lg:block fixed right-0 top-0 h-full w-80 bg-white border-l p-6 mt-16">
        <QuickStats />
        <RecentActivity />
      </div>
    </div>
  );
};