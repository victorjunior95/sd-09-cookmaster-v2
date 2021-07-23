const jwt = require('jsonwebtoken');
const modelUsers = require('../models/users');

const SECRET = 'mysupersecret';

const validateJWT = async (req, res, next) => {
  // console.log(req.body);
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: 'missing auth token' });

  try {
    const payload = jwt.verify(token, SECRET);
    const user = await modelUsers.findByEmail(payload.email);

    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'jwt malformed' });
  }
};

module.exports = validateJWT;
