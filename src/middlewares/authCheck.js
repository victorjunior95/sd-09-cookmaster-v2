const checkToken = require('../auxiliarFunctions/checkToken');

const authCheck = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ code: 401, message: 'jwt malformed' });
  
  const result = checkToken(token);

  if (result.error) return next({ code: 401, message: 'jwt malformed' });
  const { _id } = result.data;
  req.userId = _id;

  next();
};

module.exports = authCheck;