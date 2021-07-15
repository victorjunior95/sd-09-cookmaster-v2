const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const {status, message} = require('../services/statusAndMessages');
const env = require('../env');

const authService = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    // return res.status(status.UNAUTHENTICATED).json(message.tokenError);
    return res.status(status.UNAUTHENTICATED).json(message.tokenMissing);
  }
  try {
    const decodedPayload = jwt.verify(token, env.secret);
    if(!decodedPayload) {
      return res.status(status.UNAUTHENTICATED).json(message.tokenError);
    }
    // console.log(decodedPayload.email);
    const userFindInDb = await userModel.findEmail(decodedPayload.email);
    // console.log(userFindInDb);
    if(!userFindInDb) {
      return res.status(status.UNAUTHENTICATED).json(message.tokenError);
    }
    req.user = userFindInDb;
    // console.log(req.user);
    next();

  } catch (error) {
    return res.status(status.UNAUTHENTICATED).json(message.tokenError);
  }
};

module.exports = authService;