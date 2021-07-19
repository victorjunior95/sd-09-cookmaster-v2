const { Router } = require('express');

const loginController = require('../controllers/loginController');

const router = Router();

router.route('/')
  .post(loginController.chekLogin);

module.exports = router;
