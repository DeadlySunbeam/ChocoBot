module.exports.run = async (inter) => {

	const message = inter.channel.messages.cache.get(inter.targetId);

	if (inter.member.permissions.has('MANAGE_MESSAGES') && inter.member.permissions.has('SEND_MESSAGES')) {
		if (!message.embeds.length) {

			if (message.content.length > 2000) {
				inter.reply({ content:'Ошибка, не удалось перевести в текст, символов не должно быть больше 2000!', ephemeral:true });
			}
			message.channel.send({ content:message.content });

			inter.reply({ content:'Text в Text переведен', ephemeral:true });
			return;
		}

		try {
			if (message.embeds[0].description.length > 2000) {
				inter.reply({ content:'Ошибка, не удалось перевести в текст, символов не должно быть больше 2000!', ephemeral:true });
				return;
			}
			message.channel.send({ content:message.embeds[0].description });
		}
		catch (error) {
			inter.reply({ content:'Ошибка, не удалось перевести в Text!', ephemeral:true });
			return;
		}
		inter.reply({ content:'Перевод Embed в Text прошел успешно!', ephemeral:true });
		console.log(message.embeds[0].length);
	}
	else {
		inter.reply({ content:'Эта функция доступна только модерации и администрации!', ephemeral:true });
	}

};

module.exports.help = {
	name: 'Перевести в Text',
};