const express = require('express');
const validateEmailAndPassword = require('../auth/validateJWT');
const login = require('../controllers/loginController');
const { checkLoginInput } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', checkLoginInput, validateEmailAndPassword, login);

module.exports = router;