const multer = require('multer');
const imgPath = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, imgPath.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;