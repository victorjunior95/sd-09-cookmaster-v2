const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'src', 'uploads');

const storage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;