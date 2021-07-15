const InvalidUserFormError = require('../errors/InvalidUserFormError');
const EmailAlreadyExistError = require('../errors/EmailAlreadyExistError');
const StatusCode = require('../statusCode');

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof InvalidUserFormError) {
    return res.status(StatusCode.badRequest).json({ message: err.message });
  } 
  if (err instanceof EmailAlreadyExistError) {
    return res.status(StatusCode.conflict).json({ message: err.message });
  }
};

module.exports = errorHandler;