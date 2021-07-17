const users = require('../models/users');
const generateToken = require('../utils/generateToken');

const create = (userInfo) => users.create(userInfo)
  .then(({ password, ...user }) => ({ status: 201, user }));

const login = ({ email }) => generateToken(email)
  .then(({ token }) => ({ status: 200, token }));

module.exports = { create, login };
