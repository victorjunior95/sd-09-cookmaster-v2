const StatusCode = require('../statusCode');

module.exports = class LoginFieldMissingError extends Error {
  constructor() {
    super('All fields must be filled');
    this.code = StatusCode.unauthorized;
  }
};