const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

let db = null;

const connection = async () => {
  if (!db) {
    const conn = await MongoClient.connect(MONGO_DB_URL, OPTIONS);
    db = conn.db(DB_NAME);
    return db;
  }
  return Promise.resolve(db);
};

module.exports = connection;  
