const ERROR_MIDDLEWARE = (err, _req, res, _next) => {
  console.log('erro');
  return res.status(err.err).json(err.msg);
};

module.exports = ERROR_MIDDLEWARE;
