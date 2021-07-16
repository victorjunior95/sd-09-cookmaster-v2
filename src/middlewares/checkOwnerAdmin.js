const recipesModels = require('../models/recipesModels');

const checkOwnerAdmin = async (req, _res, next) => {
  const { id } = req.params;
  const { userId, role } = req;
  const result = await recipesModels.checkOwnership({ id, userId, role });

  if (!result.name) next(result);

  next();
};

module.exports = checkOwnerAdmin;