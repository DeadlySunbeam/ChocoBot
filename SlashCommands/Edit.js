const { EmbedBuilder } = require('discord.js');

module.exports.run = async (inter) => {

	const message = inter.channel.messages.cache.get(inter.targetId);

	if (inter.member.permissions.has('MANAGE_MESSAGES') && inter.member.permissions.has('SEND_MESSAGES')) {


		inter.reply({ content:'Введите измененное сообщение', ephemeral:true });


		const filter = m => m.author.id === inter.member.id;
		const collector = inter.channel.createMessageCollector({ filter, time: 150000, max:1 });

		collector.on('collect', m => {

			if (!message.embeds.length) {


				//	inter.reply({ content:'Данное сообщение не является RichEmbed', ephemeral:true });
				message.edit({ content:m.content });


				return;
			}
			else {

				const embed = new EmbedBuilder()
					.setDescription(m.content)
					.setColor('#4169E1');

				message.edit({ embeds: [embed] });
			}
			//	inter.reply({ content:'Сообщение было изменено', ephemeral:true });

			//	msg.delete();

			m.delete();

		});


	}
	else {
		inter.reply({ content:'Эта функция доступна только модерации и администрации!', ephemeral:true });
	}

};

module.exports.help = {
	name: 'Редактировать',
};