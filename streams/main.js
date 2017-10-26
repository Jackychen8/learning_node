var fs = require("fs");// file system
// Reading from Stream
// var data = '';

// // Create a readable stream
// var readerStream = fs.createReadStream('input.txt');

// // Set the encoding to be utf8.
// readerStream.setEncoding('UTF8');

// // Handle stream events --> data, end, and error
// readerStream.on('data', (chunk) => {
// 	data += chunk;
// });

// readerStream.on('end', () => {
// 	console.log(data);
// });

// readerStream.on('error', (err) => {
// 	console.log(err.stack);
// });

// console.log("Program Ended");



/////////////////////////////////////////
// // Writing to Stream
// var data = 'Simply Easy Learning';

// // Create a writable stream
// var writerStream = fs.createWriteStream('output.txt');

// // Write the data to stream with encoding to be utf8
// writerStream.write(data, 'UTF8');

// // Mark the end of the file
// writerStream.end();

// // Handle stream events --> finish, and error
// writerStream.on('finish', () => {
// 	console.log("Write completed.");
// });

// writerStream.on('error', (err) => {
// 	console.log(err.stack);
// });

// console.log("Program ended.");



/////////////////////////////////////////
// Piping Stream
// Creaete a readable stream
// var readerStream = fs.createReadStream('input.txt');

// // Create a writable stream
// var writerStream = fs.createWriteStream('output.txt');

// // Pipe the r/w operations
// // read input.txt and write data to output.txt
// readerStream.pipe(writerStream);

// console.log("Program ended.");



/////////////////////////////////////////
// Chaining Streams
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
// fs.createReadStream('input.txt')
// .pipe(zlib.createGzip())
// .pipe(fs.createWriteStream('input.txt.gz'));

// console.log("File Compressed.");

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('input.txt.gz')
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream('input.txt'));

console.log("File Decompressed.");




