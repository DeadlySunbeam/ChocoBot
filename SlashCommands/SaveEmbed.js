const fs = require('fs');

module.exports.run = async (inter) => {

	const message = inter.channel.messages.cache.get(inter.targetId);

	if (inter.member.permissions.has('ADMINISTRATOR')) {
		if (!message.embeds.length) {
			inter.reply({ content:'Данное сообщение не является RichEmbed', ephemeral:true });
			return;
		}

		const embedDir = `./GUILDS/${inter.guild.id}/embeds.json`;

		if (!fs.existsSync(embedDir)) {
			fs.writeFileSync(embedDir, JSON.stringify(message.embeds));
		}
		else {
			fs.appendFileSync(embedDir, JSON.stringify(message.embeds));
		}
		inter.reply({ content:'Сохранено', ephemeral:true });
	}
	else {
		inter.reply({ content:'Эта функция доступна только администрации!', ephemeral:true });
	}
};

module.exports.help = {
	name: 'Сохранить Embed',
};