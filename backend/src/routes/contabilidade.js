// backend/src/routes/contabilidade.js
const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');
const parametroController = require('../controllers/parametroController');
const { authMiddleware } = require('../middlewares/auth');

// Middleware de autenticação para todas as rotas
router.use(authMiddleware);

// ===== Rotas de Contas =====
router.get('/contas', contaController.listar);
router.get('/contas/:id', contaController.obter);
router.post('/contas', contaController.criar);
router.put('/contas/:id', contaController.atualizar);
router.delete('/contas/:id', contaController.desativar);
router.post('/contas/importar/padrao', contaController.importarPadrao);

// ===== Rotas de Parâmetros =====
router.get('/parametros', parametroController.listar);
router.get('/parametros/:id', parametroController.obter);
router.get('/parametros/chave/:chave', parametroController.obterPorChave);
router.post('/parametros', parametroController.criar);
router.put('/parametros/:id', parametroController.atualizar);

// ===== Rotas de Lançamentos (a implementar) =====
// router.get('/lancamentos', lancamentoController.listar);
// router.post('/lancamentos', lancamentoController.criar);

module.exports = router;