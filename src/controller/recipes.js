const service = require('../service');

const postRecipe = async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const { 
    status,
    recipe,
    message,
  } = await service.recipes.postRecipe(name, ingredients, preparation, _id);

  if (status !== 201) return res.status(status).json({ message });

  res.status(status).json({ recipe });
};

const getAll = async (req, res) => {
  const result = await service.recipes.getAll();

  res.status(200).json(result);
};

module.exports = {
  postRecipe,
  getAll,
};
