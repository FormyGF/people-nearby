const app = require('express')();
const server = require('http').createServer(app, {pingTimeout: 60000, pingInterval: 25000});
const io = require('socket.io')(server);
const pushWithTokenWithBadges = require('./pushNotification');
const log4js = require('log4js');

// configure logger for server
// https://github.com/nomiddlename/log4js-node
log4js.configure('log4js-configuration.json', { reloadSecs: 300 });
log4js.configure('log4js-configuration.json', { cwd: __dirname + '/log4js-configuration.json' });
const serverLogger = log4js.getLogger('server-logger');
// override node console.log to logger
console.log = (message) => {
	serverLogger.trace(message);
}

console.err = (error) => {
	serverLogger.error(error);
}

let users = {}; // store user name alias {userId: socketId}
let userSockets = {}; // store socket id with socket object {socketId:client}
// let disConnectedUsers = {}; 
let messageCache = {}; // cache user message when they are off line {userId:message}
let deviceTokens = {}; // store user device token {userId:deviceToken}

app.use("/", (req,res) => {

	res.json({message: "received"});

})

io.on('connection', function(client) {
	console.log('\n' + `connected with ${client.id}`);
	userSockets["/#" + client.id] = client;

	getOnlineUser();

// when application disconnect with server
	client.on('disconnect', (message) => {

		console.log('\n' + `Disconnected: ${message}`);

	})

// when an app wants to send message to another app
	client.on('message', function(message) {

		console.log('\n' + message);
		sendMessage(message);

	})

// bind username with socket id
	client.on('verifyUser', function(message) {

		console.log('\n' + `================= Comfirming User Info =================\n\t Confirming user: ${message.userId} \n\t Socket ID: ${message.socketId} \n\t DeviceToken: ${message.deviceToken ? message.deviceToken.slice(0,7) : "simulator"}...\n========================================================`);
		// users[message.userId] =  userSockets[message.socketId];
		users[message.userId] = message.socketId
		deviceTokens[message.userId] = message.deviceToken;
		userSockets[users[message.userId]].emit("connectionConfirmedByServer", {});

		attemptRetrieveUserMessage(message.userId);

	}) 

// when a socket disconnected
	client.on('disconnectUser', function(message) {

		console.log('\n' + 'disconnected ' + message.userId);

	})

// when a user reconnected
	client.on('reconnectUser', function(message) {

		console.log('\n' + 'reconnected ' + message.userId);

	})
});

server.listen(3000);

let sendMessage = (content) => {

	if (!users[content.to]) // incase the user doesn't exist
	{
		console.log('\n' + `Cannot find user with id ${content.to}`);
		console.log('\n' + content);
		return;
	}

	let toId = users[content.to];

	getOnlineUser()
	.then((currentSocketId) => {

		if (currentSocketId.indexOf(toId.slice(2)) == -1){ // need to get rid of the '/#' prefix

			console.log('\n' + `User ${toId} is offline`);

			let badges = cacheUserMessage(content);
			// TODO: add badges to notification
			notifyUser(deviceTokens[content.to], badges);

			return;
		} else {

			userSockets[users[content.to]].emit("newMessage", {message : content.message, from: content.from});

		}
	})
	.catch(err => {

		console.err('\n' + `Retrieve user id with error : ${err}`);

	})
}

let getOnlineUser = () => { // get users that is currently online

	return new Promise((resolve, reject) => {

		console.log('\n' + 'Getting current online user:');

		io.clients((err, clients) => {

			clients.forEach((element, index) => {

				console.log('\n' + `\t ${index + 1}. ${element}`)

			})
			resolve(clients);
		})
	})
}

let notifyUser = (token, badges) => {

	// TODO: push notification when the user is currently disconnected (in background or terminated)
	pushWithTokenWithBadges(token, badges);

}

let cacheUserMessage = (message) => {

	// TODO: store this message into messageCache, user will get the message when reconnected
	console.log('\n' + 'Caching message into message waiting list');

	if (messageCache[message.to]) {

		messageCache[message.to].push(message);

	} else {

		let newWaitingMessageArray = [message];
		messageCache[message.to] = newWaitingMessageArray;
	}

	// return the current number unread notification for badges
	return messageCache[message.to].length
}

let attemptRetrieveUserMessage = (userId) => {

	// TODO: get the messge that stored in messageCache when then user is offline
	if (messageCache[userId] && messageCache[userId].length > 0) {


		let waitingMessage = messageCache[userId];
		console.log('\n' + `==> Getting waiting message from cache: ${waitingMessage.length} messages`)

		waitingMessage.forEach( function(element) {
			sendMessage(element);
		});

		messageCache[userId] = [];

	} else {

		console.log('\n' + `==> No waiting message found for user: ${userId}\n `);

	}
}
















