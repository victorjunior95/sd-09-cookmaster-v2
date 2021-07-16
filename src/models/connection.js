const { MongoClient } = require('mongodb');

// const MONGODB_URI = 'mongodb://localhost:27017/Cookmaster';
const MONGODB_URI = 'mongodb://mongodb:27017/Cookmaster';

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_NAME = 'Cookmaster';

const connection = async () => {
  const connect = await MongoClient.connect(MONGODB_URI, OPTIONS);
  const db = connect.db(DB_NAME);
  return db;
};

module.exports = connection;
