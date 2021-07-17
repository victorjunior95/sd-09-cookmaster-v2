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
    { $set: { ...newDataRecipe } },
  );
  return { _id: id, name, ingredients, preparation, userId };
};

const exclude = async (id) => {
  const db = await connection();
  await db.collection(recipes).deleteOne({ _id: ObjectId(id) });
};

const addImage = async (id, image) => {
  try {
    const db = await connection();

    const recipe = await getById(id);

    await db.collection(recipes).updateOne(
      { _id: ObjectId(id) },
      { $set: {
        image,
      } },
    );

    return { ...recipe, image };
  } catch (error) {
    return error;
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getById,
  updateRecipe,
  exclude,
  addImage,
};
