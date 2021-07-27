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

const drop = async (data, id) => {
  await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

  const dropRecipe = await listById(id);

  return dropRecipe;
};

const uploadPicture = async (id, image) => {
  await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } }));

  const upload = await listById(id);

  return upload;
};

module.exports = {
  create,
  list,
  listById,
  edit,
  drop,
  uploadPicture,
};
