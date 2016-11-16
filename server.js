const app = require('express')();
const server = require('http').createServer(app, {pingTimeout: 60000, pingInterval: 25000});
const io = require('socket.io')(server);
const pushWithToken = require('./pushNotification')

let users = {}; // store user name alias {userId: socketId}
let userSockets = {}; // store socket id with socket object {socketId:client}
// let disConnectedUsers = {}; 
let messageCache = {}; // cache user message when they are off line {userId:message}
let deviceTokens = {}; // store user device token {userId:deviceToken}

app.use("/", (req,res) => {

	res.json({message: "received"});

})

io.on('connection', function(client) {

	console.log(`connected with ${client.id}`);
	userSockets["/#" + client.id] = client;

	getOnlineUser();

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

		console.log('=======================================================')
		console.log(`\t Confirming user: ${message.userId} \n\t Socket ID: ${message.socketId} \n\t DeviceToken: ${message.deviceToken}`);
		console.log('=======================================================')
		// users[message.userId] =  userSockets[message.socketId];
		users[message.userId] = message.socketId
		deviceTokens[message.userId] = message.deviceToken;
		userSockets[users[message.userId]].emit("connectionConfirmedByServer", {});

		attemptRetrieveUserMessage(message.userId);

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

server.listen(3000);

let sendMessage = (content) => {

	if (!users[content.to]) // incase the user doesn't exist
	{
		console.log(`Cannot find user with id ${content.to}`);
		return;
	}

	let toId = users[content.to];

	getOnlineUser()
	.then((currentSocketId) => {

		if (currentSocketId.indexOf(toId.slice(2)) == -1){ // need to get rid of the '/#' prefix

			console.log(`User ${toId} is offline`);

			cacheUserMessage(content);
			notifyUser(deviceTokens[content.to]);

			return;
		} else {

			userSockets[users[content.to]].emit("newMessage", {message : content.message, from: content.from});

		}
	})
	.catch(err => {

		console.log(`Retrieve user id with error : ${err}`);

	})
}

let getOnlineUser = () => { // get users that is currently online

	return new Promise((resolve, reject) => {

		console.log('getting current online user:');

		io.clients((err, clients) => {

			console.log(clients);
			resolve(clients);

		})
	})
}

let notifyUser = (token) => {

	// TODO: push notification when the user is currently disconnected (in background or terminated)
	pushWithToken(token);

}

let cacheUserMessage = (message) => {

	// TODO: store this message into messageCache, user will get the message when reconnected
	console.log('Caching message into message waiting list');

	if (messageCache[message.to]) {

		messageCache[message.to].push(message.message);

	} else {

		let newWaitingMessageArray = [message];
		messageCache[message.to] = newWaitingMessageArray;

	}
}

let attemptRetrieveUserMessage = (userId) => {

	// TODO: get the messge that stored in messageCache when then user is offline
	if (messageCache[userId]) {

		let waitingMessage = messageCache[userId];
		waitingMessage.forEach( function(element) {
			sendMessage(element);
		});

		messageCache[userId] = null;

	} else {

		console.log(`No waiting message found for user: ${userId}`);

	}
}
















