const jwt = require('jsonwebtoken');

const privateKey = 'myprecious';

const INVALID_ENTRIES = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'jwt malformed',
  },
};

function validateName(name) {
  if (!name) throw INVALID_ENTRIES;
}

function validateIngredients(ingredients) {
  if (!ingredients) throw INVALID_ENTRIES;
}

function validatePreparation(preparation) {
  if (!preparation) throw INVALID_ENTRIES;
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (err) {
    throw INVALID_TOKEN;
  }
}

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
};
