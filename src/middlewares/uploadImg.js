const multer = require('multer');
const path = require('path');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');

const diskStorage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const uploadToMemory = multer({ storage: diskStorage });

module.exports = uploadToMemory;