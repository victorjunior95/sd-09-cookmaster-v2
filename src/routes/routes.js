const routes = require('express').Router();

const usersRoute = require('./usersRoute');
const loginRoute = require('./loginRoute');
const recipesRoute = require('./recipesRoute');
const imagesRoute = require('./imagesRoute');

routes.use('/users', usersRoute);
routes.use('/login', loginRoute);
routes.use('/recipes', recipesRoute);
routes.use('/images', imagesRoute);

module.exports = routes;
