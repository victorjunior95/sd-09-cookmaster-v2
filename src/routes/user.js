const express = require('express');
const rescue = require('express-rescue');

const userController = require('../controller/user');

const router = express.Router();

router.post(
  '/',
  rescue(userController.insertUserController),
);

module.exports = router;
