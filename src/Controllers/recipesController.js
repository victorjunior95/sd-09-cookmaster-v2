const recipeService = require('../Services/recipeService');

const addRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !preparation || !ingredients) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    const recipe = await recipeService.addRecipe(name, ingredients, preparation);
    return res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
};

const getRecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipe(id);
    if (recipe) {
        return res.status(200).json(recipe);
    } return res.status(404).json({ message: 'recipe not found' });
};

const updateRecipe = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    await recipeService.updateRecipe(id, body);
    res.status(200).json(
        {
            _id: id,
            name: body.name,
            ingredients: body.ingredients,
            preparation: body.preparation,
            userId: id,
        },
    );
};

const delRecipe = async (req, res) => {
    const { id } = req.params;
    await recipeService.delRecipe(id);
    res.status(204).json(

    );
};

module.exports = {
    delRecipe,
    addRecipe,
    getAllRecipes,
    updateRecipe,
    getRecipe,
};