const jwt = require('jsonwebtoken');
const status = require('../api/status');
const users = require('../Models/users');

const secret = 'plusUltra';

const validateToken = async (req, res, next) => { 
  const token = req.headers.authorization;
  
  if (!token) { 
  return res
    .status(status.unauthorized).json({ message: 'missing auth token' }); 
  }
  try {
    const decoded = jwt.verify(token, secret);
    
    const user = await users.findUserByEmail(decoded.data.email);
  
    if (!user) {
      return res.status(status.unauthorized).json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(status.unauthorized).json({ message: error.message });
  }
};

module.exports = validateToken;
