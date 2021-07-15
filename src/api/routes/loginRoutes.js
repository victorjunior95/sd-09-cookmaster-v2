const express = require('express');
const loginController = require('../../../controllers/loginController');
const { validateLoginFields } = require('../../../middlewares');

const router = express.Router();

router.post('/', [validateLoginFields, loginController.login]);

module.exports = router;