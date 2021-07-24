const express = require('express');
const path = require('path');
const login = require('./login/login');
const recipes = require('./recipes/recipes');

const { user, adminUser } = require('./users/users');

const routes = express.Router();

routes.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

routes.post('/users', user);

routes.post('/users/admin', adminUser);

routes.post('/login', login);

routes.use('/recipes', recipes);

module.exports = routes;