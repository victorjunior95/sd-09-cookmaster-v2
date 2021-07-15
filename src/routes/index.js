const routes = require('express').Router();

const usersRoute = require('./users');

routes.use('/users', usersRoute);

module.exports = routes;
