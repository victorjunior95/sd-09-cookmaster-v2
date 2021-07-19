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

const upload = multer({ storage });

module.exports = upload;
