const { messages, codes, objectError } = require('./ErrorHandling');

const recipeValidator = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return objectError(messages.INVALID_ENTRIES, codes.CODE_400);
  }
  return {};
};

module.exports = { recipeValidator };