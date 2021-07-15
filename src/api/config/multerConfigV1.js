const multer = require('multer');
const path = require('path');

const uploadsPath = `${__dirname}/../../uploads`;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(uploadsPath));
  },
  filename:(req, file, callback) => {
    callback(null, file.originalname);
  }
});

module.exports = storage;