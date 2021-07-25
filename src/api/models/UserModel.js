// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function create({ name, email, password, role }) {
  const db = await connection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  const result = user.ops[0];
  return { user: result };
}

async function findByEmail(email) {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
}

module.exports = {
  create,
  findByEmail,
};
