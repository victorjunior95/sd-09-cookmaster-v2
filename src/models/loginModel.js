// const { ObjectId } = require('mongodb');
const conn = require('./conn');

const getByEmail = async (email) => {
  // console.log('res', email);
  const result = await conn().then(
    async (db) => db.collection('users').findOne({ email }),
  );
  return result;
};

module.exports = { getByEmail };
