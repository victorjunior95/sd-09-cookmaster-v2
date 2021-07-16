module.exports = class InvalidCredentialsError extends Error {
  constructor() {
    super('Incorrect username or password');
  }
};