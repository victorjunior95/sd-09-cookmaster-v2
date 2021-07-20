const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const secret = 'senhaPower';
const OK = 200;

const login = async (userEmail) => {
  const getUser = await UserModel.getUserByEmail(userEmail);
  const { _id: id, email, role } = getUser;
  const userInfo = { id, email, role };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(userInfo, secret, jwtConfig);
  return { code: OK, message: { token } };
};

module.exports = {
  login,
};