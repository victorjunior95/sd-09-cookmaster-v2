const { ObjectId } = require('mongodb');
const connection = require('./connections');

const newRecipeModel = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe))
  .then((result) => result.ops[0]);

const getAllRecipesModel = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeByIdModel = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  newRecipeModel,
      getAllRecipesModel,
      getRecipeByIdModel,
};
