const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');

const memoryStorage = multer.memoryStorage();

const memoryUpload = multer({ storage: memoryStorage });
const upload = multer({ dest: UPLOADS_FOLDER });

module.exports = {
  upload,
  memoryUpload,
};
