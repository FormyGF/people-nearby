const app = require('express')();
const server = require('http').createServer(app, {pingTimeout: 60000, pingInterval: 25000});
const io = require('socket.io')(server);

let users = {};
let userSockets = {};
let disConnectedUsers = {};

app.use("/", (req,res) => {

	res.json({message: "received"});

})

io.on('connection', function(client) {

	console.log(`connected with ${client.id}`);
	userSockets["/#" + client.id] = client;

	io.clients((err, clients) => {

		console.log(clients);

	})

// when application disconnect with server
	client.on('disconnect', (message) => {

		console.log(`disconnected: ${message}`);

	})

// when an app wants to send message to another app
	client.on('message', function(message) {

		console.log(message);
		sendMessage(message);

	})

// bind username with socket id
	client.on('verifyUser', function(message) {

		console.log(`confirming user: ${message.userId} with socket: ${message.socketId}`);
		// users[message.userId] =  userSockets[message.socketId];
		users[message.userId] = message.socketId
		userSockets[users[message.userId]].emit("connectionConfirmedByServer", {});

	}) 

// when a socket disconnected
	client.on('disconnectUser', function(message) {

		console.log('disconnected ' + message.userId);

	})

// when a user reconnected
	client.on('reconnectUser', function(message) {

		console.log('reconnected ' + message.userId);

	})
});

let sendMessage = (content) => {

	userSockets[users[content.from]].emit("newMessage", {message : content.message, from: content.from});

}

server.listen(3000);










