const jwt = require('jsonwebtoken');

const secret = 'senhadanasa';

const loginModel = require('../models/loginModel');
const { validateError, schema } = require('./schemas/loginSchema');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const login = async (email, password) => {
  const { error } = schema.validate({ email, password });

  if (error) throw validateError(401, error.message);

  const result = await loginModel.findUser(email, password);

  if (!result) throw validateError(401, 'Incorrect username or password');

  const { password: _, ...userData } = result;

  const token = jwt.sign(userData, secret, jwtConfig);

  // retornar token
  return { token };
};

module.exports = { login };
