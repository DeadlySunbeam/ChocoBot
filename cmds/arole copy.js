const Discord = module.require('discord.js');

module.exports.run = async (bot, message) => {

	// const KingPerson = message.guild.roles.cache.find(role => role.id == "416951239650050048").members;

	message.guild.members.fetch()
		.then(member => {
			const kingID = member.find(mem => mem.roles.cache.find(rol => rol.id == '416951239650050048')).id;

			const embed = new Discord.EmbedBuilder()
				.setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
				.setDescription(`Текущим королём является <@${bot.users.cache.get(kingID).id}>`)

			// .setThumbnail(message.author.image)
				.setColor('#4169E1')
			// .setTitle("Аватар пользователя")
				.setImage(bot.users.cache.get(kingID).avatarURL())
				.setFooter({ text: 'Кусь за бочок от ' + bot.users.cache.get('241850808960811008').username, iconURL: bot.users.cache.get('241850808960811008').avatarURL() });
			// .setImage(message.author.image);
			message.channel.send({ embeds:[embed] });

		})
		.catch(console.error);

};
module.exports.help = {
	name: 'король',
	type: 'info',
	desc: 'Показать текущего короля',
};
