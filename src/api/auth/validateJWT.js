const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const StatusCode = require('../schemas/StatusCode');

const secret = 'something';

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findById(decoded._id);
    
    if (!user) return res.status(StatusCode.UNAUTHORIZED).json({ 
      message: 'Erro ao procurar usuário do token.' 
    });

    req.user = user;

    next();
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = { validateJWT };
