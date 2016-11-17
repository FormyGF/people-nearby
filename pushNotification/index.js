//   https://github.com/node-apn/node-apn/wiki/Preparing-Certificates
const apn = require('apn');

const options = {
	key: __dirname + "/tianxiaoPems/key.pem",
	cert: __dirname + "/tianxiaoPems/cert.pem",

	production: false,
};

let pushNotifWithDeviceToken = (token) => {

	console.log(`Push norifi to ${token}`)
	var apnProvider = new apn.Provider(options);

	const deviceToken = token

	var note = new apn.Notification();

	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 1;
	// note.sound = "leiduan.m4a";
	// note.sound = "you_have_a_new_message.m4a"
	// note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	note.alert = "You have a new message";
	note.payload = {
		'messageFrom': 'John Appleseed'
	};
	note.topic = "com.tianxiao.PeopleNearBy";

	apnProvider.send(note, deviceToken).then((result) => {
		if (result.failed.length > 0) {

			console.log(`Push failed with ${result.failed}`);

		} else {

			console.log('Successfully pushed notification to user')

		}
	});
}

module.exports = pushNotifWithDeviceToken;