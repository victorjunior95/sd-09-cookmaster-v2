const Router = require('express').Router();
const { login } = require('./login.controller');

Router.route('/')
  .post(login);

module.exports = Router;
