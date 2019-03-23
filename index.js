const express = require("express");
const find = require("array-find");
const slugify = require("slugify");
const mongo = require("mongodb");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const port = process.env.PORT || 4999;
const app = express();
const data = [
  {
    id: "chicken-pasta",
    title: "Pasta with chicken",
    amount: "For 4 people",
    duration: "55 minutes",
    description:
      "In a large skillet over medium heat, warm oil and add chicken; cook until slightly brown. Add onion and garlic to cook for about 5 minutes or until garlic is golden and onions are translucent. Add tomatoes, broccoli, salt, pepper and oregano; stir well and bring to a boil. Cover and turn down heat to simmer for about 10 minutes."
  },
  {
    id: "scrambled-egg",
    title: "Scrambled Egg",
    amount: "For 1 person",
    duration: "15 minutes",
    description:
      "Whisk eggs, salt and pepper in small bowl. Melt butter in non-stick skillet over medium heat. Pour in egg mixture and reduce heat to medium-low. As eggs begin to set, gently move spatula across bottom and side of skillet to form large, soft curds."
  }
];

app.use("/static", express.static("static")).use(
  bodyParser.urlencoded({
    extended: true
  })
);

// mongo db
require('dotenv').config();

var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;
mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) {
        throw err;
    } else {
        db = client.db(process.env.DB_NAME);
    }
})

app
  .set("view engine", "ejs")
  .get("/", index)
  .get("/aboutMe", aboutMe)
  .get("/add", addRecipeForm)
  .post("/", addRecipe)
  .get("/recipe", recipe)
  .get("/:id", recipeFind)
  .delete("/:id", remove)
  .use(errorPage);


function index(req, res) {
  res.render("index.ejs");
}

function aboutMe(req, res) {
  res.send("This is the about ME page!");
}

function errorPage(req, res) {
  res.status(404).render("notfound.ejs");
}

function addRecipeForm(req, res) {
  res.render("add_recipe.ejs");
}

function addRecipe(req, res) {
  var id = slugify(req.body.title).toLowerCase();

  db.collection('recipe').insertOne({
    title: req.body.title,
    amount: req.body.amount,
    duration: req.body.duration,
    description: req.body.description
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertedId)
    }
  }

}

function recipe(req, res, next) {
  //mongo db
  db.collection('recipe').find().toArray(done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render("detail.ejs", {data})
    }
  }

}

function recipeFind(req, res, next) {
  var id = req.params.id;
  var filter = find(data, function(value) {
    return value.id == id;
  });

//mongo db
  db.collection('recipe').findOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('detailpage_recipt.ejs', {data: filter})
    }
  }


  res.render("detailpage_recipt.ejs", {data: filter});
}

 // Function to remove a recipe (It doesnt work yet...working on it.)
 function remove(req, res) {
   var id = req.params.id;

   data = data.filter(function(value) {
     return value.id !== id;
  });

  res.json({ status: "ok" })
}



app.listen(port);
