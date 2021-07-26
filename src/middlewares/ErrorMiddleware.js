const HTTP_BAD_REQ = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_ERR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.httpCode) {
    return res.status(err.httpCode).json({ message: err.message });
  }
  if (err.message === 'invalid_data') {
    return res.status(HTTP_BAD_REQ).json({ message: 'Invalid entries. Try again.' });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(HTTP_UNAUTHORIZED).json({ message: err.message });
  }
  if (err.message === 'not_found') {
    return res.status(HTTP_NOT_FOUND).json({ message: 'recipe not found' });
  }
  console.log(err);
  res.status(HTTP_ERR).json({ message: 'Internal error' });
};
