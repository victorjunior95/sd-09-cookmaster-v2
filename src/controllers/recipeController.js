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

module.exports = {
    createRecipe,
};