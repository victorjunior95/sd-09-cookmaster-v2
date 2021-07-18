const { JWTError } = require('../errors');
const tokens = require('../tokens');
const { User } = require('../models');

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = tokens.access.verify(token);

    const user = new User(payload);
    const userDB = await user.getByEmail();

    if (!userDB) throw new JWTError();

    const { password: _, ...userData } = userDB;
    req.user = userData;

    next();
  } catch (err) {
    next(err);
  }
};
