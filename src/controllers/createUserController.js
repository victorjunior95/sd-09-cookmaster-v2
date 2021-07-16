const {
    createUserService,
    validLoginService,
    createRecipeService,
    listAllRecipesService,
} = require('../services/createUserService');
const { ok, created } = require('../utils/statusHttp');

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        const userCreated = await createUserService({ name, email, password, role });
        return res.status(created).json(userCreated);
    } catch (error) {
        return next(error);
    }
};

const createTokenController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await validLoginService(email, password);
        res.status(ok).json({ token });
    } catch (error) {
        return next(error);
    }
};

const createRecipeController = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const userData = req.user;
        const recipeCreated = await createRecipeService({
            name,
            ingredients,
            preparation,
            userData,
        });
        res.status(created).json(recipeCreated);
    } catch (error) {
        return next(error);
    }
};

const listAllRecipesController = async (req, res, next) => {
    try {
        const allRecipes = await listAllRecipesService();
        res.status(ok).json(allRecipes);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createUserController,
    createTokenController,
    createRecipeController,
    listAllRecipesController,
};