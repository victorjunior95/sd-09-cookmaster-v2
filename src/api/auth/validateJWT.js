const jwt = require('jsonwebtoken');
const { findUser } = require('../models/usersModel');

const segredo = 'meuSegredoMuitoDifícil';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  const decoded = jwt.verify(token, segredo);
  const user = await findUser(decoded.data.name);
  
  if (!user) {
    return res.status(401).send({
    message: 'Incorrect username or password',
    });
  }
  return next();
};

module.exports = validateJWT;