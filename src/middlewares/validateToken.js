const jwt = require('jsonwebtoken');

const SECRET = 'TH!S!S@s3CR3t';

const createErrorMsg = (status, msg) => ({
  status,
  msg,
});

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw createErrorMsg(401, 'missing auth token');
    console.log(token);
    jwt.verify(token, SECRET);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = validateToken;