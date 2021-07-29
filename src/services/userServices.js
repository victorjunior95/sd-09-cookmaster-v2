const userModel = require('../models/userModel');
const createToken = require('../utils/tokenGenerator');

const create = (newUser, role) => userModel.createUser(newUser, role)
.then(({ password, ...user }) => ({ status: 201, user }));

const login = ({ email }) => createToken(email)
  .then(({ token }) => ({ status: 200, token }));

module.exports = { create, login };

// regras de negocio
// conexao entre model e controller / validações
// não manipula bd mas le bd