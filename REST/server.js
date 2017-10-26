var express = require('express');
var app = express();
var fs = require('fs');

app.get('/listUsers', (req, res) => {
	//console.log(req);
	fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
		console.log(data);
		res.end(data);
	});
})

var user = {
	"user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   	}
}

app.get('/addUser', (req, res) => {
	// First read existing users.
	fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
		data = JSON.parse(data);
		data[Object.keys(user)[0]] = user[Object.keys(user)[0]];
		console.log(data);
		res.end(JSON.stringify(data));
	});
})

app.get('/deleteUser*', (req, res) => {
	// First read existing users.
	fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
		data = JSON.parse(data);
		var userNum = req.url.substr(req.url.length - 1);
		console.log("Deleteing User: " + userNum);
		delete data["user" + userNum]
		console.log(data);
		res.end(JSON.stringify(data));
	});
})

var server = app.listen(8081, () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
})