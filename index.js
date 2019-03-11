const express = require('express');
const find = require('find');
const port = 4999;
const app = express();
const data = [{

  id: 'chicken-pasta',
  title: 'Pasta with chicken',
  amount: 'For 4 people',
  duration: '55 minutes',
  description: 'First... then... and finally.'

}]

app.use('/static', express.static('static'))
app.set('view engine', 'pug')
  .get('/', index)
  .get('/aboutMe', aboutMe)
  .get('/recipe', recipe)
  .get('/:id', recipeFind)
  .use(errorPage)

function index(req, res) {
  res.render('index.pug')
}

function aboutMe(req, res) {
  res.send('This is the about ME page!');
}

function errorPage(req, res) {
  res.status(404).render('notfound.pug');
}

function recipe(req, res) {
  var doc = '<!doctype html>';
  var length = data.length;
  var index = -1;

  doc += '<title>My recipes</title>';
  doc += '<h1>Recipes</h1>';
  doc += '<h2> Welcome to the page where I can add and remove my recipes!</h2>'

  while (++index < length) {
    recipes = data[index]
    doc += '<h3><a href="/' + recipes.id + '">' + recipes.title + '</a></h3>'
    doc += '<p>' + recipes.description + '</p>'

  }

  function recipeFind(req, res) {
    var id = req.params.id
    var doc = '<!doctype html>'
    var recipe = find(data, function(value) {
      return value.id === id
    })

    doc += '<title>' + recipes.title + ' - My recipes website</title>'
    doc += '<h1>' + recipes.title + '</h1>'
    doc += '<p>' + recipes.description + '</p>'

    res.send(doc)

  }


app.listen(port);
