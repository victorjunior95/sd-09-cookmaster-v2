const jwt = require('jsonwebtoken');

const missingAuthToken = { message: 'missing auth token' };
const JWTmalformed = { message: 'jwt malformed' };

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  const JWT_SECRET = 'meuSegredoSuperSecreto';
  if (!token) {
   return res.status(401).json(missingAuthToken);
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload) {
      return res.status(401).json(JWTmalformed);
    } 
      req.user = payload;
      next();
  } catch (error) {
    return res.status(401).json(JWTmalformed);
  }
};

module.exports = {
  auth,
};