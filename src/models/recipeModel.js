const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

async function create({ userId, name, ingredients, preparation }) {
    const recipeCollection = await getConnection('recipes');
    const { insertedId } = await recipeCollection.insertOne({
        userId,
        name,
        ingredients,
        preparation,
    });
    return {
        id: insertedId,
        name,
        ingredients,
        preparation,
    };
}

async function getAll() {
    const recipeCollection = await getConnection('recipes');
    const allRecipes = await recipeCollection.find();
    return allRecipes.toArray();
}

async function getRecipe(recipeId) {
    if (!ObjectId.isValid(recipeId)) return;
    const recipeCollection = await getConnection('recipes');
    const recipe = await recipeCollection.findOne({ _id: new ObjectId(recipeId) });
    return recipe;
}

module.exports = {
    create,
    getAll,
    getRecipe,
};