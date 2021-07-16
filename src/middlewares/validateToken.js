const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/usersModel');

const SECRET = 'MinhaSenhaSuperSecretaSoQueNao';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, SECRET);
    const user = await getUserByEmail(payload.email);
    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = validateToken;