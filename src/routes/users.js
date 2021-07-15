const routes = require('express').Router();
const rescue = require('express-rescue');

const users = require('../controllers/usersController');

routes.post('/', rescue(users.create));

module.exports = routes;