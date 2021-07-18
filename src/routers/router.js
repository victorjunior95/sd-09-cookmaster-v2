const express = require('express');
const { usersController, loginController, recipesController } = require('../controllers');
const error = require('../middlewares/error');
// criando uma rota, variável router
// sendo proprietária das rotas agora
// ela que vai guardar todas as minhas rotas
const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use('/recipes', recipesController);
router.use(error);

module.exports = router;