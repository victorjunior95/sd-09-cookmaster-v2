const express = require('express');

const controller = require('../controllers/usersControllers');
const { checkNewUserInfo, checkIfEmailExists } = require('../middlewares/usersMiddlewares');

const router = express.Router();

router.post('/', checkNewUserInfo, checkIfEmailExists, controller.createUser);

module.exports = router;