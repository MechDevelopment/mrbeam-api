import express = require('express');

const app: express.Application = express();

app.get('/', function (req, res) : void {
  res.send('Hello World!');
});

app.get('/generate', function (req, res) : void {
  res.send('generate');
});

const port: string = process.env.PORT || '3000';

app.listen(port, function (): void {
  console.log('App is listening on port:', port);
});