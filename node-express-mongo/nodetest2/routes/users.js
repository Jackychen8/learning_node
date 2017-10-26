var express = require('express');
var router = express.Router();// In basica example, express()
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
var fs = require('fs');

/* GET userlist*/
router.get('/userlist', (req, res) => {
	var db = req.db;
	var collection = db.get('userlist');
	collection.find({},{},(e, docs) => {
		res.json(docs);
	});
});

/* POST adduser */
router.post('/adduser', upload.single('upl'), (req, res) => {
	var db = req.db;
	var collection = db.get('userlist');

	// create path to write image to (AWS)
	var file = __dirname + "/uploads/" + req.file.originalname;
	console.log('Folder that will hold Upload + imagename: ' + file);

	// Read in image file
	fs.readFile( req.file.path, (err, data) => {
		// When done, callback to write the image to upload folder path
		fs.writeFile(file, data, (err) => {
			if(err) {
				console.log('Error: ' + err);
			}else {
				// if image written to upload folder successfully,
				// insert the form data to mongodb
				req.body.imagePath = file;
				collection.insert(req.body, (err, result) => {
					res.send(
						(err === null) ? {msg: ''} : {msg: err}
					);
				});
			}
		});
	});
	// collection.insert(req.body, (err, result) => {
	// 	res.send(
	// 		(err === null) ? {msg: ''} : {msg: err}
	// 	);
	// });
});

/* DELETE to deleteuser */
router.delete('/deleteuser/:id', (req, res) => {
	var db = req.db;
	var collection = db.get('userlist');
	var userToDelete = req.params.id;
	collection.remove({ '_id' : userToDelete }, (err) => {
		res.send((err === null) ? { msg: ''} : { msg:'error: ' + err });
	});
});

module.exports = router;