const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectionMock = async () => {
  await DBServer.ensureInstance();
  const URLMock = DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
}

module.exports = connectionMock;