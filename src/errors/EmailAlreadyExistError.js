const StatusCode = require('../statusCode');

module.exports = class EmailAlreadyExistError extends Error {
  constructor() {
    super('Email already registered');
    this.code = StatusCode.conflict;
  }
};