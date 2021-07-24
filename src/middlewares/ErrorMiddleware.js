const HTTP_ERR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.httpCode) {
    return res.status(err.httpCode).json({ message: err.message });
  }
  console.log(err);
  res.status(HTTP_ERR).json({ message: 'Internal error' });
};
