const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const exists = await userModel.getByEmail(decoded.data.email);
    if (decoded.data.role === 'admin' && exists) {
      console.log('deu bom');
      req.userId = decoded.data.role;
      return next();
    }
    console.log('nao due');
    return res.status(403).json({ message: 'Only admins can register new admins' });
  } catch (err) {
    console.log('sou admin');
    return res.status(401).json({ message: err.message });
  }
};