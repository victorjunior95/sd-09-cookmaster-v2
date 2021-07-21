const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const missingToken = { status: 401, message: 'missing auth token' };
const notFound = { status: 404, message: 'User Not Found' };
const jwtError = { status: 401, message: 'jwt malformed' };
const validadeLogin = async (req, _res, next) => {
  try {
    const secret = '1234';
    const { authorization } = req.headers;
    if (!authorization) { throw missingToken; }
    const extractToken = jwt.verify(authorization, secret);
    if (!extractToken) { 
      throw jwtError; 
    }
    
    const userDb = await userModel.findEmail(extractToken.email);
    if (!userDb) { throw notFound; }
    req.user = userDb;
    next();
  } catch ({ status, message }) {
    next({ status, message });
  }
};

module.exports = {
  validadeLogin,
};