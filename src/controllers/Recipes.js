const recipesService = require('../services/Recipes');

const CREATE_SUCCESS = 201;

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

module.exports = {
  registerRecipe,
};
