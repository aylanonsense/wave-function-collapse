//set up a web server
var path = require('path');
var express = require('express');
var app = express();

//server web files
app.use(express.static(path.join(__dirname + '/public')));
app.use('/javascripts', express.static(path.join(__dirname, '/javascripts')));

//serve libraries
app.get('/jquery.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/node_modules/jquery/dist/jquery.js'));
});
app.get('/require.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/node_modules/requirejs/require.js'));
});
app.get('/mustache.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/node_modules/mustache/mustache.js'));
});

//start the web server
app.listen(process.env.PORT || 3000);