const { MongoClient } = require('mongodb');

// /**
//  * **URL** correta para o funcionamento dos testes
//  */
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_NAME = 'Cookmaster'

/**
 * **URL** correta para que o avaliador funcione.
 */
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster'; 

let db = null;

/**
 * Código base Retirado do último projeto **store-manager-sd-09** e do bloco 27.1
 */
const connection = () => {
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
      .then((conn) => {
        db = conn.db(DB_NAME);
        return db;
      });
};

module.exports = connection;
