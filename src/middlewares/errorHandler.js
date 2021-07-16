const Errors = require('../errors');
const StatusCode = require('../statusCode');

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof Errors.InvalidUserFormError) {
    return res.status(StatusCode.badRequest).json({ message: err.message });
  } 
  if (err instanceof Errors.EmailAlreadyExistError) {
    return res.status(StatusCode.conflict).json({ message: err.message });
  }
  if (err instanceof Errors.LoginFieldMissingError) {
    return res.status(StatusCode.unauthorized).json({ message: err.message });
  }
  if (err instanceof Errors.InvalidCredentialsError) {
    return res.status(StatusCode.unauthorized).json({ message: err.message });
  }
};

module.exports = errorHandler;