import express = require('express');

const app: express.Application = express();

app.use(function(req, res, next) {
  res.header("Content-Type",'application/json');
  next();
})

app.get('/', function (req, res) {
  res.send(JSON.stringify({
    GET: '/generate',
    POST: '/generate /calculate'
  }, null, 4));
})

app.get('/generate', function (req, res) {
  res.send('in developing...');
})

const port: string = process.env.PORT || '3000';

app.listen(port, function () {
  console.log('App is listening on port:', port);
})