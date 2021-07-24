const { authUser } = require('../services/users/authUser');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next({ error: true, code: 'STATUS_UNAUTHORIZED', message: 'missingToken' });
  }

  const response = await authUser(token);
 
  if (response.error) return next(response);

  delete response.password;
  
  req.user = response;

  next();
};

module.exports = authMiddleware;
