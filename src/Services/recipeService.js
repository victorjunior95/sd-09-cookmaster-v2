const reciperModels = require('../Models/recipeModel');

const addRecipe = async (name, email, password) => {
    const recipe = await reciperModels.addRecipe(name, email, password);
    return recipe;
};

module.exports = {
    addRecipe,
};