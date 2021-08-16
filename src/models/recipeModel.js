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

module.exports = {
    create,
    getAll,
};