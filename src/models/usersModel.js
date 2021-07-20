const connection = require('./mongoConnection');

async function getUserByEmail(email) {
  const db = await connection();
  const response = await db.collection('users').findOne({ email });
  return response;
}

async function addUser(name, email, password) {
  const db = await connection();
  const response = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return { user: response.ops[0] };
}

module.exports = {
  getUserByEmail,
  addUser,
};
