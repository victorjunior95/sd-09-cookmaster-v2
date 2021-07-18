const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id)));
};

const getAll = async () => 
  connection() 
    .then((db) => db.collection('recipes').find().toArray());
    
// const update = async (id, name, ingredients, preparation) =>
//   connection().then((db) =>
//     db.collection('recipes')
//       .updateOne(
//         { _id: ObjectId(id) },
//         { $set: { name, ingredients, preparation } },
//       ));

// const addImage = async (id, image) =>
//   connection().then((db) =>
//     db
//       .collection('recipes')
//       .updateOne(
//         { _id: ObjectId(id) },
//         { $set: { image } },
//       ));

// const del = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connection().then((db) =>
//     db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
// };

module.exports = { create, getAll, getById }; // , , update, del, addImage };