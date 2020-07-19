import express = require('express');

import generate from './src/generate';

const app: express.Application = express();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

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
  res.send(JSON.stringify(generate(), null, 4));
})

app.post("/generate", (req, res) => {

  console.log("body: ", req.body);
  console.log(!req.body);

  //if(!req.body) return res.send(JSON.stringify(generate(), null, 4));

  try {
    res.send(JSON.stringify(generate(req.body), null, 4));
  } catch (error) {
    res.sendStatus(400)
  }

});



const port: string = process.env.PORT || '3000';

app.listen(port, function () {
  console.log('App is listening on port:', port);
})