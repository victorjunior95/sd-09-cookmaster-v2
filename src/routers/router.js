const express = require('express');
const { usersController, loginController } = require('../controllers');
const error = require('../middlewares/error');
const validateToken = require('../middlewares/validateToken');
// criando uma rota, variável router
// sendo proprietária das rotas agora
// ela que vai guardar todas as minhas rotas
const router = express.Router();

router.use('/users', usersController);
router.use('/login', loginController);
router.use('/recipes', validateToken);
router.use(error);

module.exports = router;