const express = require('express');
const { list, register, login } = require('../controllers/UsersController');
const getError = require('../middlewares/error');
const { validateUser, validateLogin } = require('../middlewares/validateUser');

const router = express.Router();

router.get('/users', list);

router.post('/login', validateLogin, login);

router.post('/users', validateUser, register);

router.use(getError);

module.exports = router;