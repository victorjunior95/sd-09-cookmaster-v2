// const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function create({ name, email, password, role }) {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  const result = newUser.ops[0];
  const { password: _, ...user } = result;
  return { user };
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
