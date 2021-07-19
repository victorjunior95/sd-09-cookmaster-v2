const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const errorMiddleware = require('../middlewares/errorMiddleware');
// primeiro as validações e depois o token

const SECRET = 'mysupersecret';

const jwtConfig = {
  expiresIn: '30min',
  algorithm: 'HS256',
};

const userLoginService = async (email, password) => {
  const loginUser = await usersModel.loginUsers(email, password);
  // console.log('loginUser', loginUser);
  if (!loginUser || loginUser.password !== password) {
    // usuário não existe ou senha inválida
    throw errorMiddleware.validateError(401, 'Incorrect username or password');
  }

  const { password: _, ...loginUserWithout } = loginUser; // apagar a senha
  // o "_" em password serve para não utilizar essa senha para mais nada
  const token = jwt.sign(loginUserWithout, SECRET, jwtConfig);

  return { token };
};

module.exports = {
  userLoginService,
};