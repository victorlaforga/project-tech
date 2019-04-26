
const express = require("express");
const find = require("array-find");
const slugify = require("slugify");
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4999;
const session = require("express-session");
const routes = require('./routes');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();



app.use("/static", express.static("static")).use(
  bodyParser.urlencoded({
    extended: true
  })
);
require("dotenv").config();



mongoose.connect('mongodb+srv://admin:admin@cluster0-pcrgr.mongodb.net/recipes' || 'mongodb://127.0.0.1:27018/recipes', { useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connected');
});

app
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      cookie: {}
    })
  )
  .set("view engine", "ejs")
  .get("/", routes.index)
  .get("/aboutMe", routes.aboutMe)
  .get("/add", routes.addRecipeForm)
  .post("/", routes.addRecipe)
  .get("/recipe", routes.recipe)
  .get("/:id", routes.recipeFind)
  .delete("/:id", routes.remove)
  .use(errorPage);


function errorPage(req, res) {
  res.status(404).render("notfound.ejs");
}


app.listen(process.env.PORT || 4999);
