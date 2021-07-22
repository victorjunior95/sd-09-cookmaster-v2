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

  updateRecipe: async (id, recipe) => {
    const query = { _id: ObjectId(id) };
    const update = { $set: recipe };
    const options = { returnOriginal: false };

    const updateRecipe = await connection().then((db) =>
      db.collection('recipes').findOneAndUpdate(query, update, options));

    return updateRecipe.value;
  },

  deleteRecipe: async (id) => {
    await connection().then((db) =>
      db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  },

  addImage: async (id, path) => {
    const query = { _id: ObjectId(id) };
    const update = { $set: { image: `localhost:3000/${path}` } };
    const options = { returnNewDocument: true };

    const addImage = await connection().then((db) =>
      db.collection('recipes').findOneAndUpdate(query, update, options));

    return addImage.value;
  },
};
