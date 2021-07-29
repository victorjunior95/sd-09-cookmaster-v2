const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.post('/', usersController.postUser);
router.post('/admin', usersController.postAdmin);
module.exports = router;
