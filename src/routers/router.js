const express = require('express');
const { usersController, loginController } = require('../controllers');
const error = require('../middlewares/error');
// criando uma rota, variável router
// sendo proprietária das rotas agora
// ela que vai guardar todas as minhas rotas
const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use(error);
// passos:
// receber o usuario e senha
// se usuario ou senha invalidos 
// retorna o erro
// se validos faz a busca no banco se existem
// se não existem os dois retorna erro
// se existe 
// faz a criação do token e 
// retorna o token

module.exports = router;