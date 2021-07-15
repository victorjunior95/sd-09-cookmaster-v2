const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');
const loginService = require('../services/loginService');
const {loginCheck} = loginService;
const {status, message} = require('../services/statusAndMessages');
const env = require('../env');

router.post('/', loginCheck, async(req, res) => {
  try {
    const jwtConfig= {
      expiresIn: '1h',
      algorithm:'HS256'
    };
    const {_id, email, role} = req.user;
  
    const token = jwt.sign(
      {id: _id, email: email, role: role}, env.secret, jwtConfig);
    
    res.status(status.OK).json({'token': token});
    
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.serverError);
  }
});

module.exports = router;