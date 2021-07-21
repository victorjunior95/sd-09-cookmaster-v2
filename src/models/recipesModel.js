const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipes = async (name, ingredients, preparation, userId) => {
  const newRecipes = await connection()
    .then((db) => db.collection('recipes')
    .insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }));

  return newRecipes.ops[0];
};

const listRecipes = async () => {
  const listRecipe = await connection()
  .then((db) => db.collection('recipes')
  .find().toArray());

  return listRecipe;
};

const recipesId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection('recipes')
    .findOne(new ObjectId(id)));

  return recipe;
};

const editRecipes = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) return null;

  const edit = await connection()
    .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } }))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));

  return edit;
};

const deleteRecipes = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
  .then((db) =>
  (ObjectId.isValid(id)
  ? db.collection('recipes')
  .deleteOne({ _id: ObjectId(id) })
  : null));
};

const uploadImage = async (urlImage, id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
  .then((db) =>
  db.collection('recipes')
  .updateOne({
    _id: ObjectId(id),
  },
  {
    $set:
    {
      image: urlImage,
    } }));
};

module.exports = {
  registerRecipes,
  listRecipes,
  recipesId,
  editRecipes,
  deleteRecipes,
  uploadImage,
};
