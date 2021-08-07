const express = require('express');
const users = require('../controllers/users');
const validate = require('../middlewares/validators');

const route = express.Router();

route.post('/', users.create);
route.post('/admin', validate.token, validate.admin, users.createAdmin);

module.exports = route;