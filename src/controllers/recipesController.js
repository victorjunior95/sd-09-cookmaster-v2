const status = require('../statuscode/status');
const recipesServices = require('../services/recipesServices');

const createRecipes = async (req, res) => {
  const userId = req.user;
  const { name, ingredients, preparation } = req.body;

  try {
    const result = await recipesServices.createRecipes(
      name,
      ingredients,
      preparation,
      userId,
    );
    res.status(status.CREATE).json({ recipe: result });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ messagem: err.messagem });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const result = await recipesServices.getAllRecipes();
    res.status(status.OK).json(result);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ messagem: err.messagem });
  }
};

const getByRecipes = async (req, res) => {
  const { id } = req.params;
  const result = await recipesServices.getByRecipes(id);
  if (result == null) {
    return res.status(status.NOT_FOUND).json({ message: status.MESSAGE });
  }

  try {
    res.status(status.OK).json(result);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ mensagem: err.messagem });
  }
};

const updateRecipes = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const upRecipe = req.body;

  const result = await recipesServices.updateRecipes(
    id, upRecipe, _id,
  );
  res.status(status.ok).json(result);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
  updateRecipes,
};