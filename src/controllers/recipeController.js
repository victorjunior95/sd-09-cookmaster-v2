/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { recipeModel } = require('../models');

/**
 * @param { Request } req
 * @param { Response } res
 */
async function createRecipe(req, res) {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    const createdRecipe = await recipeModel.create({
        name, ingredients, preparation, userId: user.id,
    });
    res.status(201).json({ recipe: {
        _id: createdRecipe.id,
        name: createdRecipe.name,
        ingredients: createdRecipe.ingredients,
        preparation: createdRecipe.preparation,
        userId: createdRecipe.userId,
    } });
}

async function getAllRecipes(req, res) {
    const allRecipes = await recipeModel.getAll();
    res.status(200).json(allRecipes);
}

async function getRecipe(req, res) {
    const { id } = req.params;
    const recipe = await recipeModel.getRecipe(id);
    if (!recipe) {
        res.status(404).json({ message: 'recipe not found' });
        return;
    }
    res.status(200).json(recipe);
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
};