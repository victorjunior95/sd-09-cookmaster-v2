const recipesService = require('../services/Recipes');

const CREATE_SUCCESS = 201;
const OK = 200;

const registerRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const result = await recipesService.register({ name, ingredients, preparation, _id });

    res.status(CREATE_SUCCESS).json({ recipe: result });
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({ message: data.message });
  }
};

const getAllRecipe = async (req, res) => {
  const result = await recipesService.getAll();
  res.status(OK).json(result);
};

module.exports = {
  registerRecipe,
  getAllRecipe,
};
