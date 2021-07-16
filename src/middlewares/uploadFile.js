const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
