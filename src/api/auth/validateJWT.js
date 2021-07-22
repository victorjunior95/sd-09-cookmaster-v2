const jwt = require('jsonwebtoken');

const segredo = 'meuSegredoMuitoDifícil';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: 'missing auth token' });

  try {
    const userInfo = jwt.verify(token, segredo);
    req.user = userInfo;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;