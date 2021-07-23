const isValidRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  // console.log(req.body);
  // console.log(`${name}estou aqui`);
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = isValidRecipe;
