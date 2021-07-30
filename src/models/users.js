const connection = require('./connection');

async function findUser(email, password) {
  const query = password ? { email, password } : { email };
  const db = await connection();
  const result = await db.collection('users').findOne(query);
  return result;
}

async function newUser(name, email, password) {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  return result.ops[0];
}

module.exports = {
  newUser,
  findUser,
};
