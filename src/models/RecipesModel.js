const { ObjectID } = require('mongodb');
const connection = require('./connection');
const { validateError } = require('../middlewares/validateUser');

const listAllRecipes = async () => {
  const conn = await connection();
  const users = conn.collection('recipes').find().toArray();

  return users;
};

const findById = async (id) => {
  if (!ObjectID.isValid(id)) throw validateError(404, 'recipe not found');
  const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));

  if (!recipe) return null;

  return recipe;
};

const registerRecipe = async ({ name, ingredients, preparation, userId }) => {
  const insertResponse = await connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return {
    recipe: {
      _id: insertResponse.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

const update = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectID.isValid(id)) throw validateError(100, 'Tomei no cu');
  const { userId } = await findById(id);
  await connection()
  .then((db) => db.collection('recipes')
  .update({ _id: new ObjectID(id) }, { $set: { name, ingredients, preparation } }));
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  listAllRecipes,
  registerRecipe,
  findById,
  update,
}; 