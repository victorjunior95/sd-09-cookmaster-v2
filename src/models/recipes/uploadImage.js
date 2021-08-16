const { ObjectId } = require('mongodb');
const connection = require('../connection');

module.exports = async (id, imagePath) => {
  const { name, ingredients, preparation, userId } = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId, image: imagePath } },
      ));
  return ({
    id: ObjectId(id),
    name,
    ingredients,
    preparation,
    userId,
    image: imagePath,
  });
};
