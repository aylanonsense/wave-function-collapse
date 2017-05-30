//set up a web server
var path = require('path');
var express = require('express');
var app = express();

//serve files
app.use(express.static(path.join(__dirname, '/public')));
app.get('/bundle.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist/bundle.js'));
});
app.get('/0.bundle.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist/0.bundle.js'));
});
app.get('/gif.worker.js', function(req, res) {
	res.sendFile(path.join(__dirname, '/lib/gifjs/gif.worker.js'));
});
app.get('/gif.worker.js.map', function(req, res) {
	res.sendFile(path.join(__dirname, '/lib/gifjs/gif.worker.js.map'));
});
//start the web server
app.listen(process.env.PORT || 3000);