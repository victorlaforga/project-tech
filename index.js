
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



var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})


app.use("/static", express.static("static")).use(
  bodyParser.urlencoded({
    extended: true
  })
);
require("dotenv").config();




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
