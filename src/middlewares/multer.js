const multer = require('multer');
const path = require('path');

const UPLOAD_PATH = path.join(__dirname, '..', '/uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, UPLOAD_PATH);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.includes('jpeg')) {
    req.acceptFileFormat = false;
    return callback(null, false);
  }
  req.acceptFileFormat = true;
  return callback(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;