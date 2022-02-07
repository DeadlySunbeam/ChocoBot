const fs = require('fs');
const https = require('https');
module.exports.run = async (bot, message) => {

	console.log(message.content);
	if (message.attachments.size == 1) 	{
		// console.log(message.attachments)
		const file = fs.createWriteStream('./DiscordBotImages/' + message.attachments.first().filename);
		https.get(message.attachments.first().proxyURL, function(response) {
			// console.log(response)
			response.pipe(file);
		});
	}
	console.log(message.channel.id);


};
module.exports.help = {
	name: 'get',
	type: 'admin',
	desc: 'Команда помощи',
};
