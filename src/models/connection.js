const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

/**
 * @type { MongoClient }
 */
let connection;

async function getConnection(collectionName) {
  if (!connection) {
    connection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const db = connection.db(DB_NAME);
  const collection = db.collection(collectionName);
  return collection;
}

module.exports = getConnection;
