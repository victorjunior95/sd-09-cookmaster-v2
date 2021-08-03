const multer = require('multer');
const path = require('path');

// Código escrito com base na aula ao vivo 28.2, utilizando o próprio nome do arquivo para armazenamento;

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;