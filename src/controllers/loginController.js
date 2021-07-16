const express = require('express');
const jwt = require('jsonwebtoken');
const { getByEmail } = require('../models/loginModel');

const router = express.Router();
// const { ObjectId } = require('mongodb');
const { checkUser, validatefilds } = require('../services/loginService');

const cc = 200;

router.post('/', validatefilds, checkUser, async (req, res) => {
  const user = await getByEmail(req.body.email);
  const secret = 'cookMaster';
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign(user, secret, jwtConfig);
  return res.status(cc).json({ token });
});

router.get('/', async (req, res) => {
  res.send('get');
});
router.put('/', async (req, res) => {
  res.send('put');
});
router.delete('/', async (req, res) => {
  res.send('delete');
});

module.exports = router;