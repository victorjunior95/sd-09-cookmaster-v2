const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads');

const nameStorage = multer.diskStorage({
  destination: UPLOADS_FOLDER,
  filename: (req, file, callback) => {
    const { id } = req.params;
    const extension = file.mimetype.split('/')[1];
    req.filePath = `localhost:3000/src/uploads/${id}.${extension}`;
    console.log('upload');
    callback(null, `${id}.${extension}`);
  },
});

const nameUpload = multer({ storage: nameStorage });

module.exports = {
  nameUpload,
};
