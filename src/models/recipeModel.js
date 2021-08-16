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

async function update({ recipeId, name, ingredients, preparation }) {
    const recipeCollection = await getConnection('recipes');
    await recipeCollection.updateOne(
        { _id: new ObjectId(recipeId) },
        { $set: { name, ingredients, preparation } },
    );
    const updatedRecipe = await getRecipe(recipeId);
    return updatedRecipe;
}

async function remove(recipeId) {
    const recipeCollection = await getConnection('recipes');
    await recipeCollection.deleteOne({ _id: new ObjectId(recipeId) });
}

module.exports = {
    create,
    getAll,
    getRecipe,
    update,
    remove,
};