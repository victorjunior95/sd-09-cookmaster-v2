const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const SECRET = 'segredo_mais_secreto';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const validateFields = ({ name, email, password }) => {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  if (!name || !email || !password || !EMAIL_REGEX.test(email)) return false;

  return true;
};

const returnObject = (data) => {
  const { password, ...values } = data;

  return values;
};

const validadeLoginFields = ({ email, password }) => {
  if (!email || !password) return false;

  return true;
};

const registerUser = async ({ name, email, password }) => {
  const isValid = validateFields({ name, email, password });

  if (!isValid) return { code: 400, message: 'Invalid entries. Try again.' };

  const user = await UserModel.registerUser({ name, email, password });

  if (!user) return { code: 409, message: 'Email already registered' };

  return returnObject(user);
};

const userLogin = async ({ email, password }) => {
  const isValid = validadeLoginFields({ email, password });

  if (!isValid) return { code: 401, message: 'All fields must be filled' };

  const canLogin = await UserModel.userLogin({ email, password });

  if (!canLogin) return { code: 401, message: 'Incorrect username or password' };

  const userData = returnObject(canLogin);

  const token = jwt.sign({ data: userData }, SECRET, jwtConfig);

  return token;
};

module.exports = {
  registerUser,
  userLogin,
};
