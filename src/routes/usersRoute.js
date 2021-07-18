const routes = require('express').Router();
const rescue = require('express-rescue');

const users = require('../controllers/usersController');

routes.post('/', rescue(users.create));
routes.post('/admin', rescue(users.createAdmin));

module.exports = routes;
