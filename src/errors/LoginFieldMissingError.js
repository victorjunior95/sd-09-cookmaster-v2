module.exports = class LoginFieldMissingError extends Error {
  constructor() {
    super('All fields must be filled');
  }
};