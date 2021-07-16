module.exports = (err, _req, res, _next) => {
  const erro = {

    message: err.error.message,

  };

  res.status(err.status).json(erro);
};