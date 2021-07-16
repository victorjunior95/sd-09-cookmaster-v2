const StatusCode = require('../statusCode');

module.exports = class RecipeNotFoundError extends Error {
  constructor() {
    super('recipe not found');
    this.code = StatusCode.notFound;
  }
};