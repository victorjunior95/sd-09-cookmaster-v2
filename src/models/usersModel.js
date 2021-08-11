const connection = require('./connections');

const findByEmail = async ({ email }) => {
  const result = await connection().then((db) => db
    .collection('users').findOne({ email }));
  return result;
};

const registerUserModels = async ({ name, email, password }) => {
  const newRegister = await connection().then((db) => db
    .collection('users').insertOne({ name, email, password }));

  return { user: { _id: newRegister.insertedId, name, email, role: 'user' } };
};

const registerAdminModels = async ({ name, email, password }) => {
  const newAdmin = await connection().then((db) => db
    .collection('users').insertOne({ name, email, password }));
  
  return { user: { _id: newAdmin.insertedId, name, email, role: 'admin' } };
};

module.exports = {
  findByEmail,
  registerAdminModels,
  registerUserModels,
};
