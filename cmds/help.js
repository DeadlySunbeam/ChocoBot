const Discord = module.require('discord.js');


module.exports.run = async (bot, message, args) => {


	let name_flag = '';

	let text = '';

	if (args.length === 0) {
		bot.commands.forEach(element => {
			if (element.help.type === 'info' || element.help.type === 'image') {
				if (!Array.isArray(element.help.name)) {
					text += '**' + element.help.name + '**' + ' - ' + element.help.desc + '\n\n';
				}
				else if (name_flag != element.help.name[0]) {
					name_flag = element.help.name[0];
					const commands = element.help.name.toString().replace(/,/g, ', ');
					text += '**' + commands + '**' + ' - ' + element.help.desc + '\n\n';
				}
			}
		});
	}

	else {
		if (!bot.commands.has(args[0])) {
			message.channel.send('Такой команды нет. Введите ``!помощь`` без параметров, если хотите посмотреть все доступные команды.'); return;
		}

		text += '**' + bot.commands.get(args[0]).help.name + '**' + ' - ' + bot.commands.get(args[0]).help.desc;

	}


	const embed = new Discord.MessageEmbed()
		.setAuthor(message.author.username, message.author.avatarURL)
		.setDescription(text)

	// .setThumbnail(message.author.image)
		.setColor('#4169E1')
		.setTitle('Доступные команды')
		.setImage(message.author.avatarURL);
	// .setFooter("Кусь за бочок от "+bot.users.get("241850808960811008").username, bot.users.get("241850808960811008").avatarURL)
	// .setImage(message.author.image);
	message.author.send({ embeds:[embed] });
};
module.exports.help = {
	name: 'помощь',
	type: 'info',
	desc: 'Команда помощи',
};

