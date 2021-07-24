const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const status = require('../other/httpCode');
const messages = require('../other/messages');

const secret = 'cookmaster'; /* segredo */

const jwtConfig = { /* Configuração */
  expiresIn: '15m',
  algorithm: 'HS256',
};

const validateEmail = (email) => {
  if (!email) throw messages.UNAUTHORIZED_ALL_FIELDS_MUST_BE_FILLED; /* Verifica se email existe */
};

const validatePassword = (user, password) => {
  if (!password) throw messages.UNAUTHORIZED_ALL_FIELDS_MUST_BE_FILLED; /* Verifica se senha existe */
  if (!user || user.password !== password) { 
    throw messages.UNAUTHORIZED_INCORRECT_USERNAME_OR_PASSWORD; 
}
};

const validateLogin = async (email, password) => { /* Valida email e senha login */
  validateEmail(email);
  const createdUser = await userModel.findUserByEmailModel(email);
  validatePassword(createdUser, password);
  delete createdUser.name;
  delete createdUser.password;

  const generateToken = jwt.sign({ data: createdUser }, secret, jwtConfig); /* Assinatura */
  // console.log(`Token Login Service ${generateToken}`);
  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwZmM0YzBiNDFlY2NmMmUwYzAyOWRjOCIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTYyNzE0NzI3NSwiZXhwIjoxNjI3MTQ4MTc1fQ.6Uuj04_iqtXWKyblUbiv4zqsfVJnJNKYL42MyEyQXhw */
  return {
    status: status.OK,
    generateToken,
  };
};

module.exports = {
  validateLogin,
};
