const multer = require('multer');

const addImage = () => {
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, 'src/uploads'),
    filename: (req, _file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  });

  const add = multer({ storage });
  return add.single('image');
};

module.exports = addImage; 

// Referências: https://github.com/tryber/sd-08-cookmaster/pull/32/files#diff-42b380c92bfe8562a9dc7c39933de81b0f06b91fc97c8490668f8a4329f1276a