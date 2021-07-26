const HTTP_ERR = 500;

module.exports = (err, _req, res, _next) => {
  console.log(err);
  res.status(HTTP_ERR).json({ message: 'Internal error' });
};
