const multer = require('multer');

const memoryStorage = multer.memoryStorage();

const uploadToMemory = multer({ storage: memoryStorage });

module.exports = uploadToMemory;