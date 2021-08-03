const UserModel = require('../models/Users');
const LoginSchemas = require('../schemas/Login');
const { createToken } = require('../schemas/Token');

const login = async (email, password) => {
  const isValid = LoginSchemas.validateLogin(email, password);
  const userData = await UserModel.getUserByEmail(email);
  const isPasswordValid = LoginSchemas.ValidatePassword(password, userData);
  
  if (isValid.result) return isValid;
  if (isPasswordValid.result) return isPasswordValid;
  const token = createToken(userData);
  return token;
};

module.exports = { login };
