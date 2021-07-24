const express = require('express');
const rescue = require('express-rescue');
const adminValidate = require('../services/adminValidate');

const router = express.Router();

const {
  createUserControl,
  createAdmin,
} = require('../controllers/userControl');

router.post('/admin', adminValidate, rescue(createAdmin));
router.post('/', rescue(createUserControl));

module.exports = router;