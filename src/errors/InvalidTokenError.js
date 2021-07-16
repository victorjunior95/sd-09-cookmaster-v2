module.exports = class InvalidTokenError extends Error {
  constructor() {
    super('jwt malformed');
  }
};