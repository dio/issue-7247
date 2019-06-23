const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse application/json
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.json({});
});

app.listen(8000);
