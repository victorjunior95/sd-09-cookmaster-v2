const { deleteById } = require('../models');

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;

  const result = await deleteById(id);
  // if (!result) {

  // }
  return res.status(204).json();
};

module.exports = deleteRecipeById;
