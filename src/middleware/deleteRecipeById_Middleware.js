const { deleteById } = require('../models');
const authentication = require('./authentication_Middleware');
const { MISSING_TOKEN } = require('../Messages/errors');

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { code, message } = MISSING_TOKEN;

  const userId = await authentication(token);
  if (userId.code === 401) {
    return res.status(code).json({ message });
  }
  const { _id, role } = userId;
  const result = await deleteById(id, _id, role);
  if (!result) {
    return res.status(code).json({ message });
  }
  return res.status(204).json();
};

module.exports = deleteRecipeById;
