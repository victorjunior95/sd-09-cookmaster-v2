const multer = require('multer');
const path = require('path');

const pathRoute = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: pathRoute,
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

module.exports = upload;