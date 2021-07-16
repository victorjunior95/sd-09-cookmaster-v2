const multer = require('multer');

const {
  registerRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
  addImageToRecipeService,
  getImageService,
} = require('../services/recipesService');

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'image/jpeg') {
    req.fileValidationError = true;
    return cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, _file, callback) => {
    const { params: { id } } = req;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ fileFilter, storage });

const registerRecipeController = async (req, res) => {
  const { body, payload: { _id: userId } } = req;
  const recipe = { ...body, userId };
  const result = await registerRecipeService(recipe);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getAllRecipesController = async (_req, res) => {
  const result = await getAllRecipesService();
  const { code, response } = result;
  return res.status(code).json(response);
};

const getRecipeByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getRecipeByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

const updateRecipeByIdController = async (req, res) => {
  const { params: { id }, body, payload: { _id: userId } } = req;
  const result = await updateRecipeByIdService(id, body, userId);
  const { code, response } = result;
  return res.status(code).json(response);
};

const deleteRecipeByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await deleteRecipeByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

const addImageToRecipeController = [
  upload.single('image'),
  async (req, res) => {
    if (req.fileValidationError) {
      return res.status(403).json({ message: 'Extension must be `jpeg`' });
    }
    const { params: { id }, file: { path } } = req;
    // const filePath = path.join(__dirname, file.path);
    const filePath = `localhost:3000/${path}`;
    const result = await addImageToRecipeService(id, filePath);
    const { code, response } = result;
    return res.status(code).json(response);
  },
];

const getImageController = async (req, res) => {
  const { params: { id } } = req;
  const result = await getImageService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  registerRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  addImageToRecipeController,
  getImageController,
};
