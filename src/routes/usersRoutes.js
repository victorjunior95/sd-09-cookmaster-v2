const { Router } = require('express');

const usersController = require('../controllers/usersController');

const router = Router();

router.route('/')
  .post(usersController.createUser);

module.exports = router;
