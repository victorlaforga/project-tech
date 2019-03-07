const express = require('express');
const port = 4999;

const app = express();


app.use('/', express.static('static'))
app.set('view engine', 'pug')
app.get('/', test)

function test(req, res) {
  res.render('index.pug')
}

function error(err, html) {
  if (err) {
    res.status(404)
      .send('Not found');
  } else {
    res.send(html)
  }
}
app.listen(port);

//if (err) {
  //res.redirect('/404'); // File doesn't exist
//} else {
  //res.send(html);
//}
