const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const uploadImageRecipe = multer({ storage });

module.exports = uploadImageRecipe;
