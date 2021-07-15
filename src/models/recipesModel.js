const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const postIntoDb = async (name, ingredients, preparation) => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const recipe = await collection.insertOne({ name, ingredients, preparation });

  const id = await recipe.insertedId;

  return recipe && { _id: id, name, ingredients, preparation };
};

const getAllRecipesFromDb = async () => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const allRecipes = await collection.find({}).toArray();

  return allRecipes;
};

const getRecipeByIdFromDb = async (id) => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const recipe = await collection.findOne({ _id: ObjectId(id) });

  return recipe || false;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();

  const collection = await db.collection('recipes');

  const updatedRecipe = await collection.updateOne({ _id: ObjectId(id) }, {
    $set: {
      name,
      ingredients,
      preparation,
    },
  });

  return updatedRecipe && {
    _id: id,
    name,
    ingredients,
    preparation,
  };
};

module.exports = {
  postIntoDb,
  getAllRecipesFromDb,
  getRecipeByIdFromDb,
  updateRecipe,
};
