const express = require('express');
const port = 4999;

const app = express();


app.use('/static', express.static('static'))
app.use(notfound)
app.set('view engine', 'pug')
app.get('/', test)


function test(req, res) {
  res.render('index.pug')
}

function notfound(err, html) {
  res.render("notfound.pug")
}

app.listen(port);
