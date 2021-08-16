const express = require('express');

const validateToken = require('../api/auth/validateToken');
const validateAdmin = require('../api/auth/validateAdmin');
const userController = require('../controllers/Users');

const router = express.Router();

router.post('/', userController.loginUser);
router.post('/admin', validateToken, validateAdmin, userController.registerAdmin);

module.exports = router;
