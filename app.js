var express = require('express');
var bodyParser = require('body-parser');
var books = require('./routes/books');
var mongoose = require('mongoose');

var app = express();

//connect to our database
//Ideally you will obtain DB details from a config file

var dbName = 'bookDB';

var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', books);

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + server.address().port);
});
