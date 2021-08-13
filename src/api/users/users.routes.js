const Router = require('express').Router();
const { createUser, createAdmin } = require('./users.controller');

Router.route('/')
  .post(createUser);

Router.route('/admin')
  .post(createAdmin);

module.exports = Router;
