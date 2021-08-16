/**
 * @typedef { import("express").Request } Request
 * @typedef { import("express").Response } Response
 */

const { recipeModel } = require('../models');
const renameUploadedFile = require('../services/renameFile');

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
    res.status(200).json({
        _id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        preparation: recipe.preparation,
        userId: recipe.userId,
    });
}

async function editRecipe(req, res) {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { user } = req;
    const recipe = await recipeModel.getRecipe(id);
    if (!user.id.equals(recipe.userId) && user.role !== 'admin') {
        res.status(401).json({ message: 'User do not have permission to do it' });
        return;
    }
    const updatedRecipe = await recipeModel.update(
        { recipeId: id, name, ingredients, preparation },
    );
    res.status(200).json({
        _id: updatedRecipe.id,
        name: updatedRecipe.name,
        ingredients: updatedRecipe.ingredients,
        preparation: updatedRecipe.preparation,
        userId: updatedRecipe.userId,
    });
}

async function remove(req, res) {
    const { id } = req.params;
    const { user } = req;
    const recipe = await recipeModel.getRecipe(id);
    if (!user.id.equals(recipe.userId) && user.role !== 'admin') {
        res.status(401).json({ message: 'User do not have permission to do it' });
        return;
    }
    await recipeModel.remove(id);
    res.status(204).json();
}

async function addPhoto(req, res) {
    const { file, user } = req;
    const { id } = req.params;
    const recipe = await recipeModel.getRecipe(id);
    if (!user.id.equals(recipe.userId) && user.role !== 'admin') {
        return res.status(401).json({ message: 'User do not have permission to do it' });
    }
    const updatedRecipe = await recipeModel.addPhoto(recipe.id,
        `localhost:3000/src/uploads/${id}.jpeg`);
    await renameUploadedFile(file, `${id}.jpeg`);
    res.status(200).json({
        _id: updatedRecipe.id,
        name: updatedRecipe.name,
        ingredients: updatedRecipe.ingredients,
        preparation: updatedRecipe.preparation,
        userId: updatedRecipe.userId,
        image: updatedRecipe.image,
    });
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipe,
    editRecipe,
    remove,
    addPhoto,
};