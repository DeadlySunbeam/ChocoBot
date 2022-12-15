const Discord = module.require('discord.js');
module.exports.run = async (bot, message, args) => {
	const msg = await message.channel.send('Generating avatar...');
	let toGet;

	try {

		toGet = message.guild.members.cache.get(args[0]) || message.mentions.members.first();

	}
	catch (error) {
		console.error(error);
	}


	const AMes = `${message}`;
	let count = 0;

	try {
		console.log (message.mentions.members.first());
	}
	catch (error) {
		console.error(error);
	}


	if (!toGet && AMes.length < 8) {

		const embed = new Discord.EmbedBuilder()
			.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
			.setDescription('Аватар пользователя ' + message.author.username)

		// .setThumbnail(message.author.image)
			.setColor('#4169E1')
		// .setTitle("Аватар пользователя")
			.setImage(message.author.avatarURL())
			.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
		// .setImage(message.author.image);
		message.channel.send({ embeds:[embed] });

		console.log(AMes.length);
	}
	else
	if (!toGet) {
		console.log('Oh no, there no user ' + toGet);
		const Susers = message.guild.members;
		// console.log(Susers.members);
		Susers.cache.forEach(function(UUser) {
			// console.log(UUser.user);

			if (UUser.user.username.match(AMes.substr(8)) && count == 0) {
				count++;
				const embed = new Discord.EmbedBuilder()
					.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
					.setDescription('Аватар пользователя ' + UUser.user.username)

				// .setThumbnail(message.author.image)
					.setColor('#4169E1')
				// .setTitle("Аватар пользователя")
					.setImage(UUser.user.displayAvatarURL())
					.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
				// .setImage(message.author.image);
				message.channel.send({ embeds:[embed] });

			}
		});
	}
	else {
		const embed = new Discord.EmbedBuilder()
			.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
			.setDescription('Аватар пользователя ' + toGet.user.username)

		// .setThumbnail(message.author.image)
			.setColor('#4169E1')
		// .setTitle("Аватар пользователя")
			.setImage(toGet.user.displayAvatarURL())
			.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
		// .setImage(message.author.image);
		message.channel.send({ embeds:[embed] });
	}
	msg.delete();
};
module.exports.help = {
	name: 'avatar',
	type: 'info',
	desc: 'показать аватар',
};
