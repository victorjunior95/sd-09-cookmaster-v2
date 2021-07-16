const jwt = require('jsonwebtoken');
const model = require('../model');
const response = require('../helpers/response');
const validateEmail = require('../helpers/validateEmail');

const secret = 'xablau';

const signIn = async (name, email, password, role = 'user') => {
  if (
    !name
    || !password
    || !validateEmail(email)
  ) return response(400, 'Invalid entries. Try again.');

  const alreadyExists = await model.users.findUserByEmail(email);
  if (alreadyExists) return response(409, 'Email already registered');

  const { status, user } = await model.users.signIn(name, email, password, role);

  return {
    status,
    user,
  };
};

const login = async (email, password) => {
  if (!email || !password) return response(401, 'All fields must be filled');
  const user = await model.users.findUserByEmail(email);
  
  if (!user || user.password !== password) return response(401, 'Incorrect username or password');

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, jwtConfig);

  return {
    status: 200,
    token,
  };
};

module.exports = {
  signIn,
  login,
};
