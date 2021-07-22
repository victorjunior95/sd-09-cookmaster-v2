const recipeServices = require('../services/recipeServices');
const validateServices = require('../services/recipeServices');

module.exports = {
  addRecipe: async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const newRecipe = await validateServices.addRecipe(name, ingredients, preparation, id);

    if (newRecipe.status) {
      return res.status(newRecipe.status).json({ message: newRecipe.message });
    }

    return res.status(201).json(newRecipe);
  },

  listAllRecipes: async (req, res) => {
    const listAllRecipes = await validateServices.listAllRecipes();

    return res.status(200).json(listAllRecipes);
  },

  listOneRecipe: async (req, res) => {
    const { id } = req.params;

    const listOneRecipe = await validateServices.listOneRecipe(id);

    if (listOneRecipe.status) {
      return res.status(listOneRecipe.status).json({ message: listOneRecipe.message });
    }

    return res.status(200).json(listOneRecipe);
  },

  updateRecipe: async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;

    const updateRecipe = await recipeServices.updateRecipe(id, recipe);

    return res.status(200).json(updateRecipe);
  },

  deleteRecipe: async (req, res) => {
    const { id } = req.params;

    await recipeServices.deleteRecipe(id);

    return res.status(204).json();
  },

  addImage: async (req, res) => {
    const { id } = req.params;
    const { path } = req.file;

    const addImage = await recipeServices.addImage(id, path);
    console.log(addImage);
    return res.status(200).json(addImage);
  },
};
