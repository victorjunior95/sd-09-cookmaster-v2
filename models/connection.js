const { MongoClient } = require('mongodb');

const DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () =>
  MongoClient.connect(DB_URL, OPTIONS).then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  });

module.exports = connection;
