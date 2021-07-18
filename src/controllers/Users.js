const { Router } = require('express');
const models = require('../models/Users');
const {
  checkUserData,
  checkUniqueEmail,
} = require('../middlewares');
const userSchemas = require('../schemas');

const Created = '201';

const usersController = Router();

usersController.post('/', checkUserData(userSchemas), 
  checkUniqueEmail, async (req, res) => {
    const { name, email, password } = req.body;
    const user = await models.create(name, email, password);
    res.status(Created).json({ user: user.ops[0] });
  });

module.exports = usersController;
