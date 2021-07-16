const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipes = 'recipes';

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const response = await db.collection(recipes)
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: response.ops[0] };
};

const getAllRecipes = async () => {
  const db = await connection();
  const response = await db.collection(recipes).find().toArray();
  return response;
};

const getById = async (id) => {
  const db = await connection();
  const response = await db.collection(recipes).findOne({ _id: ObjectId(id) });
  return response;
};

const updateRecipe = async (id, newDataRecipe) => {
  const { name, ingredients, preparation, userId } = newDataRecipe;
  const db = await connection();
  await db.collection(recipes).updateOne(
    { _id: ObjectId(id) },
    { $set: {
        name,
        ingredients,
        preparation,
        userId,
      },
    },
  );
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getById,
  updateRecipe,
};
