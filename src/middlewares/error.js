const BADREQUEST = 400;
const UNAUTHORIZED = 401;
// const FORBIDDEN = 403;
// const NOTFOUND = 404;
const CONFLICT = 409;
// const INTERNALSERVERERROR = 500;

const error = (err, _req, res, _next) => {
  if (err.message === 'Invalid entries. Try again.') {
    return res.status(BADREQUEST).json({ message: err.message });
  }
  if (err.message === 'Email already registered') {
    return res.status(CONFLICT).json({ message: err.message });
  }
  if (err.message === 'All fields must be filled') {
    return res.status(UNAUTHORIZED).json({ message: err.message });
  }
  if (err.message === 'Incorrect username or password') {
    return res.status(UNAUTHORIZED).json({ message: err.message });
  }
  // if (err.name === 'JsonWebTokenError') {
  //   return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  // }
  // if (err.message === 'recipe not found') {
  //   return res.status(NOTFOUND).json({ message: err.message });
  // }
  // if (err.message === 'missing auth token') {
  //   return res.status(UNAUTHORIZED).json({ message: err.message });
  // }
  // if (err.message === 'Only admins can register new admins') {
  //   return res.status(FORBIDDEN).json({ message: err.message });
  // }
  // res.status(INTERNALSERVERERROR).json({ message: 'Erro interno', error: err.message });
};

module.exports = { error };
