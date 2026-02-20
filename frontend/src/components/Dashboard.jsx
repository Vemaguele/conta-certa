// 1. DASHBOARD PRINCIPAL
const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra Superior */}
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">ContaPro</h1>
            <div className="text-sm text-gray-500">
              Exercício: 2024 | Período: Janeiro
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <NavItem icon="📊" label="Dashboard" active />
            <NavItem icon="🧾" label="Faturação" />
            <NavItem icon="💰" label="Contabilidade" />
            <NavItem icon="📋" label="Clientes" />
            <NavItem icon="🏢" label="Fornecedores" />
            <NavItem icon="📈" label="Relatórios" />
            <NavItem icon="⚙️" label="Configurações" />
          </nav>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard 
              title="Faturação Mensal"
              value="€ 45.280,50"
              change="+12.5%"
              icon="📈"
              color="green"
            />
            <SummaryCard 
              title="Pendente Cobrança"
              value="€ 18.750,00"
              change="-5.2%"
              icon="⏳"
              color="yellow"
            />
            <SummaryCard 
              title="IVA a Pagar"
              value="€ 8.452,30"
              change="+8.3%"
              icon="💰"
              color="blue"
            />
            <SummaryCard 
              title="Resultado Líquido"
              value="€ 12.450,20"
              change="+15.7%"
              icon="✅"
              color="purple"
            />
          </div>

          {/* Gráficos e Tabelas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Evolução Faturação</h3>
              <LineChart />
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Faturas Recentes</h3>
              <RecentInvoices />
            </div>
          </div>

          {/* Alertas e Pendentes */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertPanel />
            <TasksPanel />
          </div>
        </main>
      </div>
    </div>
  );
};