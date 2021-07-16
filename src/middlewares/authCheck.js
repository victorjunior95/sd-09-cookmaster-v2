const checkToken = require('../auxiliarFunctions/checkToken');

const authCheck = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ code: 401, message: 'missing auth token' });
  
  const result = checkToken(token);

  if (result.error) return next({ code: 401, message: 'jwt malformed' });
  const { _id, role } = result.data;
  req.userId = _id;
  req.role = role;
  next();
};

module.exports = authCheck;