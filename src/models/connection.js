const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  userNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () => {
  const DB_NAME = 'Cookmaster'; 
  return MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit();
    });
};

module.exports = connection;
