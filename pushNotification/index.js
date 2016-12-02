//   https://github.com/node-apn/node-apn/wiki/Preparing-Certificates
const apn = require('apn');

const log4js = require('log4js');
// configure logger for server
// https://github.com/nomiddlename/log4js-node
log4js.configure('log4js-configuration.json', { reloadSecs: 300 });
log4js.configure('log4js-configuration.json', { cwd: __dirname + '../log4js-configuration.json' });
const serverLogger = log4js.getLogger('notification-logger');
// override node console.log to logger
console.log = (message) => {
	serverLogger.trace(message);
}

console.err = (error) => {
	serverLogger.error(error);
}

const options = {
	key: __dirname + "/tianxiaoPems/key.pem",
	cert: __dirname + "/tianxiaoPems/cert.pem",

	production: false,
};

let pushNotifWithDeviceToken = (token, badges) => {
	if (!badges) {
		badges = 1;
	}
	console.log(`Pushing notification to token: ${token}`)
	var apnProvider = new apn.Provider(options);

	const deviceToken = token

	var note = new apn.Notification();

	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = badges;
	note.sound = "you_have_a_new_message.m4a"
  	note.alert = "You have a new message";
  	note.payload = {
		'messageFrom': 'John Appleseed'
	};
	note.topic = "com.tianxiao.PeopleNearBy";

	apnProvider.send(note, deviceToken).then((result) => {
		if (result.failed.length > 0) {

			console.err(`Push failed with ${result.failed}`);

		} else {

			console.log('Successfully pushed notification to user')

		}
	});
}

module.exports = pushNotifWithDeviceToken;
