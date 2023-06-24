const validateRecipe = (req, res, next) => {
  const { title, description, ingredients, instructions } = req.body;
  if (!title || !description || !ingredients || !instructions) {
    return res.redirect("/recipe/save");
  }
  next();
};

module.exports = validateRecipe;
