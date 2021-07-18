const routes = require('express').Router();
const rescue = require('express-rescue');

const login = require('../controllers/loginController');

routes.post('/', rescue(login.create));

module.exports = routes;
