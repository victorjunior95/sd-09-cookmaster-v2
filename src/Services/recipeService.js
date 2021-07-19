const reciperModels = require('../Models/recipeModel');

const addRecipe = async (name, email, password) => {
    const recipe = await reciperModels.addRecipe(name, email, password);
    return recipe;
};

const getAllRecipes = async () => {
    const recipe = await reciperModels.getAllRecipes();
    return recipe;
};

const getRecipe = async (id) => {
    const recipe = await reciperModels.getRecipe(id);
    return recipe;
};

module.exports = {
    addRecipe,
    getAllRecipes,
    getRecipe,
};