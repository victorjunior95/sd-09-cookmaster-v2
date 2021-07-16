const express = require('express');

const loginControle = require('../controllers/loginControllers');
const loginValidation = require('../middlewares/loginValidation');

const router = express.Router();

router.post('/', loginValidation, loginControle.userLogin);

module.exports = router;