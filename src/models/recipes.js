const { ObjectId } = require('mongodb');
const connection = require('./connections');

const create = async (recipeData) => {
  const createRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ ...recipeData }));

  return createRecipe.ops[0];
};

const list = async () => {
  const listRecipe = await connection().then((db) =>
    db.collection('recipes').find().toArray());

  return listRecipe;
};

const listById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const listRecipe = await connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id)));

  return listRecipe;
};

const edit = async (data, id) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { ...data } }));

  const editRecipe = await listById(id);

  return editRecipe;
};

module.exports = {
  create,
  list,
  listById,
  edit,
};
