export const exportarParaCSV = (contas) => {
  const cabecalho = 'Código;Nome;Classe;Natureza;Nível\n';
  const linhas = contas.map(c => 
    `${c.codigo};${c.nome};${c.classe};${c.natureza};${c.nivel || 1}`
  ).join('\n');
  
  const blob = new Blob([cabecalho + linhas], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'plano_contas.csv';
  a.click();
};