const express = require('express');
const port = 4999;

const app = express();
const fakeData

app.use(app.router);
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

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(port);
