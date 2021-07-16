const StatusCode = require('../statusCode');

module.exports = class InvalidTokenError extends Error {
  constructor() {
    super('jwt malformed');
    this.code = StatusCode.unauthorized;
  }
};