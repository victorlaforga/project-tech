require("dotenv").config();
const express = require("express");
const find = require("array-find");
const slugify = require("slugify");
const mongo = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4999;
const session = require("express-session");
const app = express();

app.use("/static", express.static("static")).use(
  bodyParser.urlencoded({
    extended: true
  })
);

var url = "mongodb://localhost:27017/recipes";
mongo.MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  function(err, client) {
    if (err) {
      throw err;
    } else {
      db = client.db(process.env.DB_NAME);
    }
  }
);

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
  .get("/", index)
  .get("/aboutMe", aboutMe)
  .get("/add", addRecipeForm)
  .post("/", addRecipe)
  .get("/recipe", recipe)
  .get("/:id", recipeFind)
  .delete("/:id", remove)
  .use(errorPage);

function index(req, res, data) {
  res.render("index.ejs", {
    data,
    myrecipe: req.session.myrecipe
  });
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

function addRecipe(req, res, next) {
  var id = slugify(req.body.title).toLowerCase();

  db.collection("recipes").insertOne(
    {
      title: req.body.title,
      amount: req.body.amount,
      duration: req.body.duration,
      description: req.body.description
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      req.session.myrecipe = {
        id: data.insertedId,
        title: req.body.title
      };

      res.redirect("/" + data.insertedId);
    }
  }
}

function recipe(req, res, next) {
  db.collection("recipes")
    .find()
    .toArray(done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("detail.ejs", {
        data,
        myrecipe: req.session.myrecipe
      });
    }
  }
}

function recipeFind(req, res, next) {
  var id = req.params.id;

  //mongo db
  db.collection("recipes").findOne(
    {
      _id: mongo.ObjectID(id)
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render("detailpage_recipt.ejs", {
        data,
        myrecipe: req.session.myrecipe
      });
    }
  }
}

function remove(req, res) {
  var id = req.params.id;

  db.collection("recipes").deleteOne(
    {
      _id: mongo.ObjectID(id)
    },
    done
  );

  function done(err) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "ok"
      });
    }
  }
}

app.listen(port);
