const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const uploadMemoryStorage = multer({ storage: memoryStorage });

module.exports = uploadMemoryStorage;
