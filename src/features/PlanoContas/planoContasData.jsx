/**
 * planoContasData.js - Dados iniciais do Plano de Contas PGC-NIRF
 * 
 * Plano de Contas completo conforme Decreto 70/2009 de Moçambique
 * Classes 1 a 5 do PGC-NIRF
 * 
 * @module planoContasData
 */

export const planoContasInicial = [
  // ============ CLASSE 1: ATIVOS (Art. 47-56) ============
  {
    id: 1,
    codigo: '11',
    nome: 'Ativos não correntes',
    classe: '1',
    natureza: 'D',
    descricao: 'Recursos controlados pela entidade com benefícios futuros esperados além de um ano',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: false,
    dataCriacao: '2024-01-01'
  },
  {
    id: 2,
    codigo: '111',
    nome: 'Ativos fixos tangíveis',
    classe: '1',
    natureza: 'D',
    descricao: 'Terrenos, edifícios, instalações e equipamentos conforme NCRF 13',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 3,
    codigo: '1111',
    nome: 'Terrenos e recursos naturais',
    classe: '1',
    natureza: 'D',
    descricao: 'Terrenos urbanos, rústicos e recursos minerais',
    nivel: 3,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 4,
    codigo: '1112',
    nome: 'Edifícios e outras construções',
    classe: '1',
    natureza: 'D',
    descricao: 'Edifícios comerciais, industriais e administrativos',
    nivel: 3,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 5,
    codigo: '1113',
    nome: 'Equipamento básico',
    classe: '1',
    natureza: 'D',
    descricao: 'Máquinas, equipamentos de produção e operação',
    nivel: 3,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 6,
    codigo: '1114',
    nome: 'Equipamento de transporte',
    classe: '1',
    natureza: 'D',
    descricao: 'Viaturas, empilhadores, outro equipamento de transporte',
    nivel: 3,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 7,
    codigo: '112',
    nome: 'Ativos intangíveis',
    classe: '1',
    natureza: 'D',
    descricao: 'Goodwill, patentes, direitos de autor conforme NCRF 14',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 8,
    codigo: '113',
    nome: 'Investimentos imobiliários',
    classe: '1',
    natureza: 'D',
    descricao: 'Propriedades detidas para rendimento ou valorização conforme NCRF 16',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 9,
    codigo: '12',
    nome: 'Ativos correntes',
    classe: '1',
    natureza: 'D',
    descricao: 'Recursos realizáveis no ciclo operacional normal (≤ 1 ano)',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: false,
    dataCriacao: '2024-01-01'
  },
  {
    id: 10,
    codigo: '121',
    nome: 'Inventários',
    classe: '1',
    natureza: 'D',
    descricao: 'Mercadorias, matérias-primas, produtos acabados conforme NCRF 9',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 11,
    codigo: '122',
    nome: 'Clientes e outros créditos a receber',
    classe: '1',
    natureza: 'D',
    descricao: 'Contas a receber de clientes, adiantamentos a fornecedores',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 12,
    codigo: '123',
    nome: 'Aplicações financeiras',
    classe: '1',
    natureza: 'D',
    descricao: 'Depósitos a prazo, títulos negociáveis de curto prazo',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 13,
    codigo: '124',
    nome: 'Caixa e equivalentes de caixa',
    classe: '1',
    natureza: 'D',
    descricao: 'Dinheiro, depósitos à ordem, aplicações de liquidez imediata',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },

  // ============ CLASSE 2: PASSIVOS (Art. 57-62) ============
  {
    id: 14,
    codigo: '21',
    nome: 'Passivos não correntes',
    classe: '2',
    natureza: 'C',
    descricao: 'Obrigações com vencimento superior a um ano',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: false,
    dataCriacao: '2024-01-01'
  },
  {
    id: 15,
    codigo: '211',
    nome: 'Empréstimos e financiamentos a longo prazo',
    classe: '2',
    natureza: 'C',
    descricao: 'Empréstimos bancários, obrigações com vencimento > 1 ano',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 16,
    codigo: '212',
    nome: 'Provisões a longo prazo',
    classe: '2',
    natureza: 'C',
    descricao: 'Provisões para garantias, pensões conforme NCRF 24',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 17,
    codigo: '22',
    nome: 'Passivos correntes',
    classe: '2',
    natureza: 'C',
    descricao: 'Obrigações com vencimento ≤ 1 ano',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: false,
    dataCriacao: '2024-01-01'
  },
  {
    id: 18,
    codigo: '221',
    nome: 'Fornecedores',
    classe: '2',
    natureza: 'C',
    descricao: 'Contas a pagar a fornecedores de bens e serviços',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 19,
    codigo: '222',
    nome: 'Empréstimos e financiamentos a curto prazo',
    classe: '2',
    natureza: 'C',
    descricao: 'Empréstimos, linhas de crédito com vencimento ≤ 1 ano',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 20,
    codigo: '223',
    nome: 'Impostos a pagar',
    classe: '2',
    natureza: 'C',
    descricao: 'IVA, IRPC, retenções na fonte a regularizar',
    nivel: 2,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },

  // ============ CLASSE 3: CAPITAL PRÓPRIO (Art. 63-66) ============
  {
    id: 21,
    codigo: '31',
    nome: 'Capital social',
    classe: '3',
    natureza: 'C',
    descricao: 'Contribuições dos detentores de capital',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 22,
    codigo: '32',
    nome: 'Reservas',
    classe: '3',
    natureza: 'C',
    descricao: 'Reservas legais, estatutárias e livres',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 23,
    codigo: '33',
    nome: 'Resultados transitados',
    classe: '3',
    natureza: 'C',
    descricao: 'Lucros acumulados não distribuídos',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 24,
    codigo: '34',
    nome: 'Resultado líquido do período',
    classe: '3',
    natureza: 'C',
    descricao: 'Lucro ou prejuízo do exercício corrente',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },

  // ============ CLASSE 4: RENDIMENTOS (Art. 72-75) ============
  {
    id: 25,
    codigo: '41',
    nome: 'Vendas e serviços prestados',
    classe: '4',
    natureza: 'C',
    descricao: 'Réditos da atividade principal conforme NCRF 28',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 26,
    codigo: '42',
    nome: 'Outros rendimentos',
    classe: '4',
    natureza: 'C',
    descricao: 'Juros recebidos, rendimentos de investimentos',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 27,
    codigo: '43',
    nome: 'Ganhos',
    classe: '4',
    natureza: 'C',
    descricao: 'Aumentos de benefícios económicos não provenientes de rendimentos',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },

  // ============ CLASSE 5: GASTOS (Art. 76-78) ============
  {
    id: 28,
    codigo: '51',
    nome: 'Custo das mercadorias vendidas e dos materiais consumidos',
    classe: '5',
    natureza: 'D',
    descricao: 'Custo dos inventários vendidos ou consumidos',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 29,
    codigo: '52',
    nome: 'Fornecimentos e serviços externos',
    classe: '5',
    natureza: 'D',
    descricao: 'Água, energia, comunicações, serviços contratados',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 30,
    codigo: '53',
    nome: 'Gastos com pessoal',
    classe: '5',
    natureza: 'D',
    descricao: 'Salários, contribuições sociais, formação conforme NCRF 19',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 31,
    codigo: '54',
    nome: 'Impostos',
    classe: '5',
    natureza: 'D',
    descricao: 'Impostos não recuperáveis, taxas e licenças',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 32,
    codigo: '55',
    nome: 'Gastos de depreciação e amortização',
    classe: '5',
    natureza: 'D',
    descricao: 'Desgaste de ativos fixos e intangíveis',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  },
  {
    id: 33,
    codigo: '56',
    nome: 'Perdas',
    classe: '5',
    natureza: 'D',
    descricao: 'Reduções de benefícios económicos não provenientes de gastos',
    nivel: 1,
    ativo: true,
    aceitaLancamentos: true,
    dataCriacao: '2024-01-01'
  }
];

// Exportar dados auxiliares
export const classesPGC = [
  { codigo: '1', nome: 'Ativos', naturezaPadrao: 'D' },
  { codigo: '2', nome: 'Passivos', naturezaPadrao: 'C' },
  { codigo: '3', nome: 'Capital Próprio', naturezaPadrao: 'C' },
  { codigo: '4', nome: 'Rendimentos', naturezaPadrao: 'C' },
  { codigo: '5', nome: 'Gastos', naturezaPadrao: 'D' },
  { codigo: '6', nome: 'Contas de Ordem', naturezaPadrao: 'D/C' },
  { codigo: '7', nome: 'Contas de Compromissos', naturezaPadrao: 'D/C' }
];

export const naturezas = [
  { codigo: 'D', nome: 'Débito' },
  { codigo: 'C', nome: 'Crédito' },
  { codigo: 'D/C', nome: 'Débito/Crédito' }
];