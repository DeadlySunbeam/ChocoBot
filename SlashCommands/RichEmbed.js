const { EmbedBuilder } = require('discord.js');

module.exports.run = async (inter) => {

	const message = inter.channel.messages.cache.get(inter.targetId);

	if (inter.member.permissions.has('MANAGE_MESSAGES') && inter.member.permissions.has('SEND_MESSAGES')) {
		if (!message.embeds.length) {
			console.log('message.embeds');

			const embed = new EmbedBuilder()
				.setDescription(message.content)
				.setColor('#4169E1');

			await message.channel.send({ embeds:[embed] });
		}
		else {
			await message.channel.send({ embeds: message.embeds });
		}
		await inter.reply({ content:'Готово', ephemeral:true });
	}
	else {
		inter.reply({ content:'Эта функция доступна только модерации и администрации!', ephemeral:true });
	}


	//	await inter.reply('Что-то пошло не так');

};

module.exports.help = {
	name: 'RichEmbed',
};