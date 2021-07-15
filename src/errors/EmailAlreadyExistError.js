module.exports = class EmailAlreadyExistError extends Error {
  constructor() {
    super('Email already regestered');
  }
};