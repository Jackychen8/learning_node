var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener #1
var l1 = () => {
	console.log('listener 1 executed.');
}
// listener #2
var l2 = () => {
	console.log('listener 2 executed.');
}

// Bind removal with console log removal
var eventListeners;
var printRemoval = () => {
	eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
	console.log(eventListeners + ' Listener(s) listening to connection event');
}

// Bind the connection event with both
eventEmitter.on('connection', l1);
eventEmitter.on('connection', l2);
eventEmitter.on('removeListener', printRemoval);

// Fire the connection event
eventEmitter.emit('connection');

// Remove the binding of l1 function
eventEmitter.removeListener('connection', l1);
console.log('l1 will not be listen now.');

// Fire the connection event
eventEmitter.emit('connection');

// Remove the binding of l1 function
eventEmitter.removeListener('connection', l2);
console.log('l2 will not be listen now.');

console.log("Program Ended.");