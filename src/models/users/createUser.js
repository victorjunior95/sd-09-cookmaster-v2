const connection = require('../connection');

module.exports = async ({ name, email, password, role }) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((user) => ({ _id: user.insertedId, name, email, role }));

  return result;
};
