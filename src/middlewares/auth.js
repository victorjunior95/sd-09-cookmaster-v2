const jwt = require('jsonwebtoken');

const secret = 'ran0405069miifjurdo43423zeuuADPlus';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const userSchema = require('../schemas/userSchema');

const authorizeLogin = async (req, res, next) => {
  const loginData = req.body;
  const error = await userSchema.validateLoginData(loginData);
  if (error) {
    console.log(error);
    return res.status(error.response).json({ message: error.message });
  }
  next();
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, secret, jwtConfig);
  return { token };
};

module.exports = {
  authorizeLogin,
  generateToken,
};
