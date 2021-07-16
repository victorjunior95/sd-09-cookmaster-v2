const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = 'Cookmaster';

const AVALITOR_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const MONGO_DB_URL = process.env.LOCAL_DB_URL || AVALITOR_DB_URL;
console.log(process.env.LOCAL_DB_URL);

let db = null;

const connection = () => (
    db ? Promise.resolve(db) : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    })
);

module.exports = connection;