const path = require('path');
const multer = require('multer');

const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

module.exports = {
  upload,
  memoryUpload,
};
