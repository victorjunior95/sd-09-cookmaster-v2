const { findRecipeByID, deleteById } = require('../models');

const delById = async (id, _id, role) => {
  if (role === 'admin') await deleteById(id);

  const find = await findRecipeByID(id);
  if (find.userId === _id) await deleteById(id);
  if (find.userId !== _id) return false;
  return true;
};

module.exports = delById;
