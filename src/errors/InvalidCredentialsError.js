const StatusCode = require('../statusCode');

module.exports = class InvalidCredentialsError extends Error {
  constructor() {
    super('Incorrect username or password');
    this.code = StatusCode.unauthorized;
  }
};