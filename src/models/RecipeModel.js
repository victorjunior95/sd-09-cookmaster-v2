const { ObjectId } = require('mongodb');
const connection = require('./connection');

const DB_COLLECTION = 'recipes';

const create = async (recipeInfo, user) => {
  const createdUser = await connection()
    .then((db) => db.collection(DB_COLLECTION)
      .insertOne({ ...recipeInfo, userId: user }));

  return { recipe: createdUser.ops[0] };
};

const getAll = async () => (
  connection().then((db) => db.collection(DB_COLLECTION).find().toArray())
);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const foundRecipe = await connection()
    .then((db) => db.collection(DB_COLLECTION)
      .findOne({ _id: ObjectId(id) }));

  return foundRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
