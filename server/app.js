var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';
var orders = require('./routes/orders');
// fill in connection string


app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve back static files
app.use(express.static(path.join(__dirname, './public')));

//Routes
app.use('/orders', orders);

app.get('/', function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log('Server is ready on port:' + app.get('port'));
});
