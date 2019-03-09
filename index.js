const express = require('express');
const port = 4999;
const app = express();
const fakeData = {

  id: 'chicken-pasta',
  title: 'Pasta with chicken',
  amount: 'For 4 people',
  duration: '55 minutes',

}

app.use('/static', express.static('static'))
app.set('view engine', 'pug')

.get('/', index)
.get('/aboutMe', aboutMe)

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

app.listen(port);
