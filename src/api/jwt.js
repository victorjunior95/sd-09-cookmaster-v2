const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'segredao';

module.exports = {
  validateToken: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    try {
      const payload = jwt.verify(token, secret);

      const userExists = await usersModel.listUserByEmail(payload.email);

      if (!userExists) {
        return res.status(404).json({ message: 'user not found' });
      }

      req.user = userExists;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  },
};
