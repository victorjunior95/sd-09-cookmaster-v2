const jwt = require('jsonwebtoken');

const SECRET = 'mysohiddensecret';

const tokenValidate = async (
  request,
  response,
  next,
) => {
  const token = request
    .headers.authorization;
  if (!token) {
    return next({
      err: {
        code: 'unauthorized',
        message: 'jwt malformed',
      },
    });
  }
  try {
    const decode = await jwt.verify(token, SECRET);
  } catch (err) {

  }
};

module.exports = tokenValidate;
