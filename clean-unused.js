// clean-unused.js
const fs = require('fs');
const path = require('path');

console.log('🧹 A analisar ficheiros não utilizados...');

// Lista de padrões a verificar (NÃO ELIMINA AUTOMATICAMENTE)
const patternsToCheck = [
  '**/*.bak',
  '**/*.tmp',
  '**/*.log',
  '**/OLD_*/**',
  '**/backup/**'
];

// APENAS LISTAR, NÃO ELIMINAR
patternsToCheck.forEach(pattern => {
  console.log(`📋 A procurar: ${pattern}`);
});

console.log('\n✅ Análise concluída!');
console.log('Para eliminar, use: rm -rf [ficheiro]');