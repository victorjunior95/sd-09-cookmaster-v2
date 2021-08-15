const connection = require('./connection');

const findByEmail = async (email) => {
  const isThereEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((data) => data);

  if (isThereEmail) return isThereEmail;

  return false;
};

const createUserModel = async (name, email, password) => connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({
      _id: insertedId,
      name,
      email,
      role: 'user',
    }));

    const createNewUserModel = async (name, email, password) => connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
    .then((result) => result.ops[0]);

module.exports = {
  createUserModel,
  findByEmail,
  createNewUserModel,
};
