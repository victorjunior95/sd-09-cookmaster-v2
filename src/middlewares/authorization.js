const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'segredosupersecreto';

const jwtMalformed = {
  status: 401,
  message: 'jwt malformed',
};

const missingToken = {
  status: 401,
  message: 'missing auth token',
};

const authorization = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) throw missingToken;

  const userEmail = jwt.verify(token, secret, (err, decode) => {
    if (err) throw jwtMalformed;
    const { email } = decode.userInfo;
    return email;
  });
  
  const data = await UsersModel.findEmail(userEmail);
  const { password, ...userInfo } = data;
  req.user = userInfo;
  next();
};

module.exports = authorization;