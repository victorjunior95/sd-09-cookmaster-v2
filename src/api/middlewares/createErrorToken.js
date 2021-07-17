  module.exports = (err, _req, _res, next) => {
    if (err.message === 'invalid token'
    || err.message === 'jwt malformed') {
    const newError = new Error();
    newError.status = 401;
    newError.message = 'jwt malformed';
    return next(newError);
    }
  
    return next(err);
  };
