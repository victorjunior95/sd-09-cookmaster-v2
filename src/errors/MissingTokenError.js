const StatusCode = require('../statusCode');

module.exports = class MissingTokenError extends Error {
  constructor() {
    super('missing auth token');
    this.code = StatusCode.unauthorized;
  }
};