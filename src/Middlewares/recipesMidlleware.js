const jwt = require('jsonwebtoken');

const missingAuthToken = { message: 'missing auth token' };
const JWTmalformed = { message: 'jwt malformed' };

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_SECRET = 'meuSegredoSuperSecreto';
  if (!token) {
    res.status(401).json(missingAuthToken);
  }
  try {
    if (token !== undefined) {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log(payload, 'payload');
    if (!payload) {
      return res.status(401).json(JWTmalformed);
    } 
      req.user = payload;
      next();
  }
  } catch (error) {
    return res.status(401).json(JWTmalformed);
  }
};

module.exports = {
  auth,
};