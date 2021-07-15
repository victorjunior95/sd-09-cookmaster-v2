const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');
const userService = require('../services/userService');
const {newUserCheck} = userService;

router.post('/', newUserCheck, async(req, res) => {
  const {name, email, password} = req.body;
  try {
    const result = await userModel.addUser(name, email, password);
    delete result.password;
    // console.log(result);
    res.status(status.CREATED).json({user:result});
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.SERVER_ERROR);
  }
});

router.get('/', async(req, res) => {
  // console.log(req.user);
  try {
    const result = await userModel.getAll();
    res.status(status.OK).json({result});
  } catch (error) {
    console.error(error.message);
    res.status(status.SERVER_ERROR).json(message.SERVER_ERROR);
  }
});

module.exports = router;