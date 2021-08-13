const express = require('express');
const controller = require('../controller/user');

const route = express.Router();

route.post('/', controller.addUserPost);
route.post('/admin', controller.postAdmin);

module.exports = route;