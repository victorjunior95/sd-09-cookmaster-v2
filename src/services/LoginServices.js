// loginService
const jwt = require('jsonwebtoken');
const validators = require('./allValidators');
const statusError = require('./allMessages');
const UsersModel = require('../models/UsersModel');

const secret = 'meutoken';
const jwtConfig = { expiresIn: '2h', algorithm: 'HS256' };

function tokenGenerator(userObjectWithoutPass) {
  try {
    const token = jwt.sign(userObjectWithoutPass, secret, jwtConfig);
    return { token };
  } catch (error) {
    return error;
  }
}

function tokenValidator(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return statusError.type4;
  }
}

function loginObjectVerifier(email, password) {
  try {
    if (!email) throw statusError.type2;
    if (!validators.passwordIsValid(password)) throw statusError.type2;
    return {};
  } catch (error) {
    return error;
  }
}

async function loginExistsVerifier(email, password) {
  try {
    const data = await UsersModel.findOneUser({ email });
    if (!data) throw statusError.type3;
    if (data.password !== password) throw statusError.type3;
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  tokenGenerator,
  tokenValidator,
  loginObjectVerifier,
  loginExistsVerifier,
};
