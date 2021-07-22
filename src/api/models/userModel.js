const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const newUser = await connection()
  .then((db) =>
    db.collection('users')
      .insertOne({ name, email, password, role }));

  return { name, email, role, _id: newUser.insertedId };
};

const getByEmail = async (email) => {
  const getEmail = await connection()
  .then((db) =>
    db.collection('users')
      .findOne(email));

  if (!getEmail) {
    return false;
  }

  return true;
};

module.exports = {
  createUser,
  getByEmail,
};