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
  const userId = req.user;
  const upRecipe = req.body;

  const result = await recipesServices.updateRecipes(
    id, upRecipe, userId,
  );
  res.status(status.OK).json(result);
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesServices.deleteById(id);
    return res.status(status.NO_CONTENT).json(result);
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.messagem });
  }
};

// tive auxílio dos alunos Adrino e Arnaelcio na construção do addImageRecipe
// https://github.com/tryber/sd-09-cookmaster-v2/tree/adriano-forcellini-sd09-project-cockmaster
// https://github.com/tryber/sd-08-cookmaster/tree/arnaelcio1-sd-08-cookmaster 

const AddImageRecipe = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  const recipe = await recipesServices.getByRecipes(id);
  const sendPath = `localhost:3000/${path}`;

  if (recipe !== null) {
    const { name, ingredients, preparation, userId } = recipe;
    const recipeToUpdate = { id, name, ingredients, preparation, userId };
    const recipeWithImage = await recipesServices.updateWithImage(recipeToUpdate, sendPath);
    return res.status(status.OK).send(recipeWithImage);
  }
  res.status(status.NOT_FOUND).json({
    message: 'recipe not found',
  });
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
  updateRecipes,
  deleteById,
  AddImageRecipe,
};