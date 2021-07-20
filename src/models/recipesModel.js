const { ObjectId } = require('mongodb');
const connection = require('./connection');

module.exports = {
  addRecipe: async (name, ingredients, preparation, id) => {
    const newRecipe = await connection().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }));

    return {
      recipe: {
        name: newRecipe.ops[0].name,
        ingredients: newRecipe.ops[0].ingredients,
        preparation: newRecipe.ops[0].preparation,
        userId: id,
        _id: newRecipe.insertedId,
      },
    };
  },

  listAllRecipes: async () => {
    const listRecipes = await connection().then((db) =>
      db.collection('recipes').find().toArray());

    return listRecipes;
  },

  listOneRecipe: async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const listOneRecipe = await connection().then((db) =>
      db.collection('recipes').findOne({ _id: ObjectId(id) }));

    return listOneRecipe;
  },
};
