const connection = require('./connection');

const findByEmail = async (email) => {
  const isThereEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((data) => data);

  if (isThereEmail) return isThereEmail;

  return false;
};

const createUserModel = async (name, email, password) => {
  const newUser = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  const newUserObj = {
    _id: insertedId,
    name: newUser.ops[0].name,
    email: newUser.ops[0].email,
    role: newUser.ops[0].role,
  };
  return newUserObj;
};

module.exports = {
  createUserModel,
  findByEmail,
};
