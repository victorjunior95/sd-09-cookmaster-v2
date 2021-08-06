const JWT_VALIDATOR = (req, res, next) => {
  console.log('VALIDA JWT');

  return next();
};

module.exports = JWT_VALIDATOR;
