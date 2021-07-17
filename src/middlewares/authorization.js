const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'segredosupersecreto';

const authorization = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const errObj = {
    status: 401,
    message: 'jwt malformed',
  };
  if (!token) throw errObj;

  const userEmail = jwt.verify(token, secret, (err, decode) => {
    if (err) throw errObj;
    const { email } = decode.userInfo;
    return email;
  });
  
  const data = await UsersModel.findEmail(userEmail);
  const { password, ...userInfo } = data;
  req.user = userInfo;
  next();
};

module.exports = authorization;