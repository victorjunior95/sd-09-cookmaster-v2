// const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

async function createUser(name, email, password) {
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    
    return { user: result.ops[0] };
}

async function getEmail(email) {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  
  return result; 
}

module.exports = {
  createUser,
  getEmail,
};