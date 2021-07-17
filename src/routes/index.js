const routes = require('express').Router();

const usersRoute = require('./users');
const loginRoute = require('./login');
const recipesRoute = require('./recipes');

routes.use('/users', usersRoute);
routes.use('/login', loginRoute);
routes.use('/recipes', recipesRoute);

module.exports = routes;
