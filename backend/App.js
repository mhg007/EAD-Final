const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Recipe = require("./models/Recipe");
const upload = require("./middlewares/upload");
const validateRecipe = require("./middlewares/validateRecipeFields");

mongoose
  .connect("mongodb://127.0.0.1:27017/recipe")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  Recipe.find()
    .then((recipes) => {
      res.render("Recipe", { recipes: recipes });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/recipes", async function (req, res) {
  const recipe = await Recipe.find();
  res.json(recipe);
});
app.get("/display", function (req, res) {
  Recipe.find()
    .then((recipes) => {
      res.render("DisplayRecipes", { recipes: recipes });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/display/:id", function (req, res) {
  const id = req.params.id;
  Recipe.findById(id)
    .then((recipes) => {
      res.render("Details", { recipes: recipes });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/delete/:id", function (req, res) {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id)
    .then((recipes) => {
      res.redirect("/display");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/recipe/save", function (req, res) {
  res.render("Recipe");
});

app.post("/recipe/save", validateRecipe, function (req, res) {
  const recipe = new Recipe(req.body);
  recipe
    .save()
    .then(function () {
      res.redirect("/display");
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.post("/upload", upload.single("file"), (req, res) => {
  const path = req.file.path;
  console.log(path);
  res.json({ file: req.file, message: "File uploaded successfully." });
});
app.post("/upload/image", upload.single("file"), (req, res) => {
  res.send({
    message: "File uploaded successfully.",
    id: file.id,
    name: file.filename,
    contentType: file.contentType,
  });
});

app.post("/search", (req, res) => {
  Recipe.find({ name: req.body.name })
    .then((recipes) => {
      res.render("Details", { recipes: recipes });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});
