const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes')
      .find({}));

  return recipes.toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw Object.assign(
      new Error('recipe not found'),
      { code: 'notFound' },
   );
  }

  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectId(id) }));
      
  if (!recipe) {
    throw Object.assign(
      new Error('recipe not found'),
      { code: 'notFound' },
    );
  }

  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return result.ops[0];
};

module.exports = {
  getById,
  getAll,
  create,
};
