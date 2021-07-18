module.exports = (err, _req, _res, next) => {
  if (err.message === 'recipe not found') {
    const newError = new Error(err.message);
    newError.status = 404;
    next(newError);
  }

  next(err);
};
