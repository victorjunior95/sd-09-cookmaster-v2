const connection = require('../connection');

module.exports = async ({ _id, name, ingredients, preparation, userId }) => {
  await connection()
    .then((db) => db.collection('recipes')
      .updateOne(
        { _id },
        {
          $set: {
            name,
            ingredients,
            preparation,
            userId,
          },
        },
      ));

  return ({ _id, name, ingredients, preparation, userId });
};
