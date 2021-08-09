const Router = require('express').Router();
const { createUser } = require('./users.controller');

Router.route('/')
  .post(createUser);

module.exports = Router;
