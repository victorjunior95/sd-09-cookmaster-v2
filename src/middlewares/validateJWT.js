const jwt = require('jsonwebtoken');
const status = require('../statuscode/status');

const userModels = require('../models/userModels');

const secret = 'trybe-t8';

const recipesJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MISSING });
  }
  
  try {
    const decode = jwt.verify(token, secret);

    if (!decode) {
      return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED });
    }
    
      // adcionar uma nova informação

      const modelsUser = await userModels.getByEmail(decode.data);
      if (modelsUser) {
        const { password, ...other } = modelsUser;
        // console.log(other);
        req.user = other;
      }

      return next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: status.MALFORMED, catch: 'linha 33' });
  }
};

module.exports = {
  recipesJWT,
};