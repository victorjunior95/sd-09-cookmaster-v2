const { JsonWebTokenError } = require('jsonwebtoken');
const tokens = require('../tokens');
const { User } = require('../models');

module.exports = (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = tokens.access.verify(token);

    const user = new User(payload);
    const userDB = user.getByEmail();

    if (!userDB) throw new JsonWebTokenError();

    const { password: _, ...userData } = userDB;
    req.user = userData;

    next();
  } catch (err) {
    next(err);
  }
};
