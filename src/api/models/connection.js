require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MONGO_DB_URL } = process.env || 'mongodb://mongodb:27017/Cookmaster';
const { DB_NAME } = process.env || 'Cookmaster';

let db = null;

const connection = () => {
   if (db) return Promise.resolve(db);

   return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    });
};

module.exports = connection;
