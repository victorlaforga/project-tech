const express = require('express');
const find = require('find');
const port = process.env.PORT || 4999;
=======
>>>>>>> 732f115d9810ab593c717930f3fa4bf91bb75cd8
const app = express();
const data = [{

  id: 'chicken-pasta',
  title: 'Pasta with chicken',
  amount: 'For 4 people',
  duration: '55 minutes',
  description: 'In a large skillet over medium heat, warm oil and add chicken; cook until slightly brown. Add onion and garlic to cook for about 5 minutes or until garlic is golden and onions are translucent. Add tomatoes, broccoli, salt, pepper and oregano; stir well and bring to a boil. Cover and turn down heat to simmer for about 10 minutes.'

},
{
  id: 'scrambled-egg',
  title: 'Scrambled Egg',
  amount: 'For 1 person',
  duration: '15 minutes',
  description: 'Whisk eggs, salt and pepper in small bowl. Melt butter in non-stick skillet over medium heat. Pour in egg mixture and reduce heat to medium-low. As eggs begin to set, gently move spatula across bottom and side of skillet to form large, soft curds.'


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

function addRecipeForm(req, res) {
  res.render('add_recipe.pug');
}

function recipe(req, res) {
  var length = data.length;
  var index = -1;
  var doc = '<!doctype html>'
  while (++index < length) {
    recipes = data[index]
    doc += '<h3><a href="/' + recipes.id + '">' + recipes.title + '</a></h3>'
    doc += '<p>' + recipes.amount + '</p>'

}}

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


  res.send(doc)
}

function recipeFind(req, res) {
  var doc = `
<!doctype html>
<title>${ recipes.title }</title>
<h1>${ recipes.title }</h1>
<p>${ recipes.description }</p>`


  res.send(doc)


}



app.listen(port);
