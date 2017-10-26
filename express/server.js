var express = require('express');
//var cookieParser = require('cookie-parser');
var app = express();
var fs = require("fs");//file system

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: '/tmp/'});

//app.use(cookieParser());
app.use(express.static('public'));// assigns the directory that __dirname points to
app.use(bodyParser.urlencoded({ extended: false }));

// Create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(multer({ dest: '/tmp/'}).single('singleFile'));
// app.use(multer({ dest: '/tmp/'}).array('multiFile'));

app.get('/', function(req, res) {
  console.log("Cookies: ", req.cookies)
})

// app.listen(8081)

// app.get('/index.html', function (req, res) {
//   res.sendFile( __dirname + "/" + "index.html" );
// })

// app.get('/process_get', function (req, res) {
//   // Prepare output in JSON format
//   response = {
//     first_name: req.query.first_name,
//     last_name: req.query.last_name
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// })

// app.post('/process_post', urlencodedParser, function (req, res) {
//   // Prepare output in JSON format
//   response = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// })

app.post('/file_upload', upload.single('file'), function (req, res) {
  console.log('File Path: ' + req.file.path);
  console.log('Filename: ' + req.file.filename);
  console.log('Mimetype: ' +req.file.mimetype);
  console.log('Originalname: ' + req.file.originalname);

  var file = __dirname + "/tmp/" + req.file.originalname;
  console.log('File (Write to): ' + file);
  fs.readFile( req.file.path, function (err, data) {
    //console.log("Data", data);
    fs.writeFile(file, data, function (err) {
      if(err){
        console.log('Error' + err);
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.file.originalname//,picture: data
        };
      }
      console.log(response);
      res.end( JSON.stringify(response) );
    });
  });
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
// app.get('/ab*cd', function(req, res) {   
//    console.log("Got a GET request for /ab*cd");
//    res.send('Page Pattern Match');
// })


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})