const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const secret = 'MAXIMUNSECRET123';
const UNAUTHORIZED = 401;

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) { 
     return res.status(UNAUTHORIZED).json({ message: 'missing auth token' }); 
}
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    const user = await userModel.findUser(decoded.validUser.email);
    
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

const admin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
  return res.status(403).json({ message: 'Only admins can register new admins' });
  }
  next();
};

module.exports = { tokenValidation, admin };
