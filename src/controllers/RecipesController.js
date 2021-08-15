const express = require('express');
const jwt = require('jsonwebtoken');
const uploadImage = require('../middleware/uploadImage');

const validateRecipesInputToCreate = require('../middleware/validateRecipesInputToCreate');
const validateToken = require('../middleware/validateToken');
const { 
    createRecipesService,
    editRecipeService,
    deleteRecipeService,
    updateWithImageService,
    getRecipeByIdService,
    getAllRecipesService,
} = require('../services/recipesService');

const RecipesRouter = express.Router();
const SECRET = 'essaédificil';

RecipesRouter.post('/', validateToken, validateRecipesInputToCreate, async (req, res) => {
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;

    const decoded = jwt.verify(token, SECRET);
    const { _id } = decoded;
    const newRecipe = await createRecipesService(name, ingredients, preparation, _id);

    res.status(201).json({ recipe: newRecipe });
});

RecipesRouter.get('/', async (req, res) => {
    const allRecipes = await getAllRecipesService();

    res.status(200).json(allRecipes);
});

RecipesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await getRecipeByIdService(id);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

RecipesRouter.put('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    try {
        const result = await editRecipeService(name, ingredients, preparation, id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

RecipesRouter.put('/:id/image/', validateToken, uploadImage, async (req, res) => {
   const { id } = req.params;
   const { file } = req;
   const resultRecipes = await updateWithImageService(id, file);
   res.status(200).json(resultRecipes);
});

RecipesRouter.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await deleteRecipeService(id);
    res.status(204).json(deletedRecipe);
});

module.exports = RecipesRouter;
