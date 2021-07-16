const StatusCode = require('../statusCode');

module.exports = class InvalidUserFormError extends Error {
  constructor() {
    super('Invalid entries. Try again.');
    this.code = StatusCode.badRequest;
  }
};