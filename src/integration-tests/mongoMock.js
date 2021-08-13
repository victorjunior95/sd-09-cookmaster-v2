const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
const DBServer = new MongoMemoryServer();

const createDB = async () => {
  try {
    const URLMock = await DBServer.getUri();
    return MongoClient.connect(URLMock, OPTIONS)
  } catch(err) {
    throw err;
  }
};

const destroyDB = async () => {
  await DBServer.stop()
}

module.exports = { createDB, destroyDB };
