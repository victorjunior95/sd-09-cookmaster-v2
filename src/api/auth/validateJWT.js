const jwt = require('jsonwebtoken');
const { findUser } = require('../../model/users');

const JWT_SECRET = 'oSegredoDaLinhaDoTempo';

module.exports = async (req, res, next) => {
  try {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });

    // return next(err);
  }

    const payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
    const user = await findUser(payload.email);
    if (!user) {
      const err = new Error('Incorrect username or password');
      err.status = 401;
    }
    req.user = user;
    return next();
  } catch (err) { err.status = 401; return next(err); }
};