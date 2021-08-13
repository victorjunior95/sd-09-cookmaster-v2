const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const DBServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getConnection = async () => {
  const URL_MOCK = await DBServer.getUri();
  return MongoClient
    .connect(URL_MOCK, OPTIONS);
};

module.exports = { getConnection, DBServer };
