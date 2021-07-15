const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: result.ops[0] };
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

const updateOne = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const recipe = await findById(id);
  await db.collection('recipes')
    .updateOne({ _id: id }, { $set: { name, ingredients, preparation } });
  return {
    _id: id, name, ingredients, preparation, userId: recipe.userId,
  };
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipe;
};

const addImage = async (id, image) => {
  const db = await connection();
  const recipe = await findById(id);
  console.log(recipe);
  await db.collection('recipes').updateOne({ _id: id }, { $set: { image } });
  return {
    _id: id,
    name: recipe.name,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation,
    userId: recipe.userId,
    image,
  };
};

/* const addImage = async (id, image) => {
  const db = await connection();
  const { _id: idDaReceita, name, ingredients, preparations, userId } = await findById(id);
  
  await db.collection('recipes').updateOne({ _id: id }, { $set: { image } });
  return {
    _id: idDaReceita,
    name,
    ingredients,
    preparations,
    userId,
    image,
  };
}; */

module.exports = {
  createRecipe,
  getAll,
  findById,
  updateOne,
  deleteRecipe,
  addImage,
};
