const validateRecipe = (req, res, next) => {
  const { name, description, ingredients, instructions } = req.body;
  if (!name || !description || !ingredients || !instructions) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  next();
};

module.exports = validateRecipe;
