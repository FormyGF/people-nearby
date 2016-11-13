const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let users = [];
let clients = {};

io.on('connection', function(client) {
	// client.emit('fancyEvent', {some: "Hello world"});

	console.log(`connected with ${client.id}`);
	clients["/#" + client.id] = client;

	// users.add(client.id);

	client.on('disconnect', (message) => {
		console.log(client);
		// users.remove(client.id);
		console.log(`disconnected: ${client}`);
	})

	client.on('message', function(message) {
		console.log(message);
		notifiUser(message)
	})
});

let notifiUser = (content) => {

	clients[content.to].emit("newMessage", {message : content.message});

}

server.listen(3000);