const recipeService = require('../Services/recipeService');

const addRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !preparation || !ingredients) {
        return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    const recipe = await recipeService.addRecipe(name, ingredients, preparation);
    return res.status(201).json({ recipe });
};

module.exports = {
    addRecipe,
};