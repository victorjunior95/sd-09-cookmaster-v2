const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const erros = require('../utils/codigosErro');

const secret = 'segredo';

const validate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(erros.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = await userModel.findByEmail(decode.email);

    if (!user) {
      return res.status(erros.UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(erros.UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = validate;