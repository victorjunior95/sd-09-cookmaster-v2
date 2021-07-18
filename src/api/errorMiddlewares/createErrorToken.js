  module.exports = (err, _req, _res, next) => {
    if (err.message === 'jwt malformed') {
    const newError = new Error(err.message);
    newError.status = 401;
    return next(newError);
    }

    if (err.message === 'invalid token') {
      const newError = new Error(err.message);
      newError.status = 401;
      return next(newError);
    }

    if (err.message === 'jwt must be provided') {
      const newError = new Error();
      newError.status = 401;
      newError.message = 'missing auth token';
      return next(newError);
    }
        
    return next(err);
  };
