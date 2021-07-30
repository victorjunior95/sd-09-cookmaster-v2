const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const secret = 'MAXIMUNSECRET123';
const UNAUTHORIZED = 401;

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) { 
      console.log('bateu aqui', token);
       return res.status(UNAUTHORIZED).json({ message: 'missing auth token' }); 
}
    const decoded = jwt.verify(token, secret);
    
    const user = await userModel.findUser(decoded.validUser.email);
    
    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = tokenValidation;
