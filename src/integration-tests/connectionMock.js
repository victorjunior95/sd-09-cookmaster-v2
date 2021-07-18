const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongo-memory-server');

const DBServer = new MongoMemoryServer();
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};
