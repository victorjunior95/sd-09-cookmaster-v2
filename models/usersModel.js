const connection = require('./connection');

const addUser = async (name, email, password, role) => {
  const emailAlreadyExists = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (emailAlreadyExists) return null;

  const response = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));

  const [user] = response.ops;

  return user;
};

module.exports = {
  addUser,
};
