module.exports = class InvalidRecipeFormError extends Error {
  constructor() {
    super('Invalid entries. Try again.');
  }
};