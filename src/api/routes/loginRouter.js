const express = require('express');
const login = require('../controllers/loginController');
const { checkLoginInput } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', checkLoginInput, login);

module.exports = router;