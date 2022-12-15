const fs = require('fs');


module.exports.run = async (bot, message, args) => {

	if (!message.member.permissions.has('ADMINISTRATOR')) {
		return message.react('⛔');
	}


	if (!args[0]) {
		return message.reply('Пожалуйста введите ID текстового канала');
	}

	const textChannel = message.guild.channels.cache.find(i => i.id === args[0]);

	if (!textChannel || !textChannel.type == 'GUILD_TEXT') {
		return message.reply('Данный ID не принадлежит ни одному существующему текстовому-каналу на сервере');
	}

	const dir = `./GUILDS/${message.guild.id}`;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const file = dir + '/SuggestionsChannel.json';
	fs.writeFileSync(file, `{"ID": "${args[0]}"}`);

	message.reply('Канал успешно добавлен в конфигурацию, пользуйтесь на здоровье!');


};
module.exports.help = {
	name: 'сетаппредлог',
	type: 'admin',
	// eslint-disable-next-line comma-dangle
	desc: 'Настроить под канал предложений'
};
