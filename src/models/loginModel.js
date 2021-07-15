// const { ObjectId } = require('mongodb');
const conn = require('./conn');

const getByEmail = (email) => conn().then(async (db) => db.collection('users').findOne({ email }));

module.exports = {
  getByEmail,
};