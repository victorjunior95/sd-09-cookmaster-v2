const express = require('express');
const { authorizeLogin, generateToken } = require('../middlewares/auth');

const router = express.Router();
const usersModel = require('../model/usersModel');

router.post('/', authorizeLogin, async (req, res) => {
  const { email, role } = await usersModel.findByEmail(req.body.email);
  const token = generateToken({ email, role });
  res.status(200).json(token);
});

module.exports = router;