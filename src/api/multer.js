const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const fileType = file.mimetype.split('/')[1];
    const { id } = req.params;
    const fileName = `${id}.${fileType}`;
    req.fileName = fileName;
    callback(null, fileName);
  } });

const imageUpload = multer({ storage });

module.exports = {
  imageUpload,
};
