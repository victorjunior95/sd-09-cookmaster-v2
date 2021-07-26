const { createRecipesModel } = require('../models/recipesModel');
const { getAllRecipesModel } = require('../models/recipesModel');
const { getRecipeByIdModel } = require('../models/recipesModel');
const { editRecipeModel } = require('../models/recipesModel');
const { deleteRecipeModel } = require('../models/recipesModel');
const { updateWithImageModel } = require('../models/recipesModel');

const createRecipesService = async (name, email, password, id) => {
    const newRecipe = await createRecipesModel(name, email, password, id);
    return newRecipe;
};

const getAllRecipesService = async () => {
    const allRecipes = await getAllRecipesModel();
    return allRecipes;
};

const getRecipeByIdService = async (id) => {
    const recipe = await getRecipeByIdModel(id);

    if (!recipe) throw new Error('recipe not found');

    return recipe;
};

const editRecipeService = async (name, ingredients, preparation, id) => {
    const updatedRecipe = await editRecipeModel(name, ingredients, preparation, id);
    if (!updatedRecipe) throw new Error('recipe not found');
    return updatedRecipe;
};

const updateWithImageService = async (id, file) => {
    const recipe = await updateWithImageModel(id, file);
    return recipe;
};

const deleteRecipeService = async (id) => {
    const deletedRecipe = await deleteRecipeModel(id);
    return deletedRecipe;
};
module.exports = {
    createRecipesService,
    getAllRecipesService,
    getRecipeByIdService,
    editRecipeService,
    deleteRecipeService,
    updateWithImageService,
};
