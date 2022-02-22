const fs = require('fs');
module.exports.run = async (bot, message) => {
	const dir = 'F:/DiscordBotImages/' + message.guild.name.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, '');
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	const dir2 = dir + '/' + message.channel.name;
	if (!fs.existsSync(dir2))fs.mkdirSync(dir2);
	const dir3 = dir2 + '/' + message.author.username.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, '');
	if (!fs.existsSync(dir3)) fs.mkdirSync(dir3);


	//	const file = fs.createWriteStream(dir3 + '/' + message.attachments.first().filename);
};
