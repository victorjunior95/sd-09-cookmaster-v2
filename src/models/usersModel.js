const connection = require('./connection');

const findByEmail = async (email) => {
  const isThereEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((data) => data);

  if (isThereEmail) return isThereEmail;

  return false;
};

const createUserModel = async (name, email, password) => await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({
      _id: insertedId,
      name,
      email,
      role: 'user',
    }));

module.exports = {
  createUserModel,
  findByEmail,
};
