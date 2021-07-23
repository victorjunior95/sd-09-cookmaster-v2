const HTTP_BAD_REQ = 400;
const HTTP_CONFLICT = 409;
const HTTP_ERR = 500;

module.exports = (err, _req, res, _next) => {
  if (err.code === 'invalid_data') {
    return res.status(HTTP_BAD_REQ).json({ message: err.message });
  }
  if (err.code === 'invalid_email') {
    return res.status(HTTP_CONFLICT).json({ message: err.message });
  }
  console.log(err);
  res.status(HTTP_ERR).json({ message: 'Internal error' });
}
