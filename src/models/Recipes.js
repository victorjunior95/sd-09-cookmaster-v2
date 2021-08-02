const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, preparation, ingredients, userId) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, preparation, ingredients, userId }))
    .then((result) => result.ops[0]);

const fetchRecipes = async () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

const editRecipe = async (id, name, preparation, ingredients) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate(
        {
          _id: ObjectId(id) },
        { 
          $set: { name, preparation, ingredients },
        },
        { returnOriginal: false },
        ))
    .then((result) => result.value);
};

const addImageToRecipe = async (id, image) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate(
        {
        _id: ObjectId(id),
        },
        {
          $set: { image },
        },
        { returnOriginal: false },
        ))
      .then((result) => result.value);
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  fetchRecipes,
  findById,
  editRecipe,
  addImageToRecipe,
  deleteRecipe,
};
