const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipesCollection = 'recipes';

async function getById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(recipesCollection).findOne({ _id: ObjectId(id) }));
}

async function createRecipe({ recipe }) {
  return connection()
    .then((db) => db.collection(recipesCollection).insertOne(recipe))
    .then((result) => getById(result.insertedId));
}

async function getAll() {
  return connection()
    .then((db) => db.collection(recipesCollection).find({}).toArray());
}

async function updateRecipe(id, body) {
  return connection()
    .then((db) => db.collection(recipesCollection).updateOne(
      { _id: ObjectId(id) },
      { 
        $set: {
          name: body.name,
          ingredients: body.ingredients,
          preparation: body.preparation,
        },
      },
    ));
}

async function updateImageRecipe(id, imageName) {
  return connection()
    .then((db) => db.collection(recipesCollection).updateOne(
      { _id: ObjectId(id) },
      { 
        $set: {
          image: imageName,
        },
      },
    ));
}

async function deleteById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(recipesCollection).deleteOne({ _id: ObjectId(id) }));
}

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteById,
  updateImageRecipe,
};
