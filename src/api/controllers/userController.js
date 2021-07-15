const express = require('express');
const erros = require('../utils/codigosErro');
const userService = require('../services/userService');
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser(name, email, password);
    res.status(result.status).json(result.json);
  }catch (err){
    res.status(erros.INTERNAL_ERROR).json({
      message: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const result = await userService.login(email, password);
  
    res.status(result.status).json(result.json);
  
  } catch (err) {
    return res.status(erros.UNAUTHORIZED).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser
};