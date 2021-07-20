const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const validadeLogin = async (req, _res, next) => {
  const error = { status: 401, message: 'jwt malformed' };
  try {
    const { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization) throw error;
  
    const secret = '1234';
    const extractToken = jwt.verify(authorization, secret);
    if (!extractToken) throw error;
    console.log(extractToken);
    const userDb = await userModel.findEmail(extractToken.email);
    if (!userDb) throw error;

    req.user = userDb;
    next();
  } catch (_) {
    next(error);
  }
};

module.exports = {
  validadeLogin,
};