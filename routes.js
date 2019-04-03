const find = require("array-find");
const mongo = require("mongodb");
const slugify = require("slugify");
const session = require("express-session");
require("dotenv").config();

let url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;
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

exports.index = function(req, res, data) {
  res.render("index.ejs", {
    data,
    myrecipe: req.session.myrecipe
  });
}

exports.aboutMe = function(req, res) {
  res.send("This is the about ME page!");
}

exports.addRecipeForm = function(req, res) {
  res.render("add_recipe.ejs");
}

exports.addRecipe = function(req, res, next) {
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

exports.recipe = function(req, res, next) {
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

exports.recipeFind = function(req, res, next) {
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

exports.remove = function(req, res) {
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
