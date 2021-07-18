module.exports = (err, _req, _res, next) => {
  if (err.message === 'Invalid entries. Try again.') {
    const newError = new Error(err.message);
    newError.status = 400;
    return next(newError);
  }

  if (err.message === 'Email already registered') {
    const newError = new Error(err.message);
    newError.status = 409;
    return next(newError);
  }
  
  if (err.message === 'All fields must be filled'
  || err.message === 'Incorrect username or password') {
    const newError = new Error(err.message);
    newError.status = 401;
    return next(newError);
  }

  next(err);
};
