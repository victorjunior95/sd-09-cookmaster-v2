module.exports = class InvalidUserFormError extends Error {
  constructor() {
    super('Invalid entries. Try again.');
  }
};