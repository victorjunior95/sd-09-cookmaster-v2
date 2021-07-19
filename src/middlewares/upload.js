const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => { cb(null, 'src/uploads'); },
  filename: (req, _file, cb) => { cb(null, `${req.params.id}.jpeg`); },
});

const upload = multer({ storage }).single('image');

module.exports = upload;
