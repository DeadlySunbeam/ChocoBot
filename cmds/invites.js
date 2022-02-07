module.exports.run = async (bot, message) => {
	bot.user.setActivity('YouTube', { type: 'WATCHING' });
	message.guild.fetchInvites()
		.then(invites => console.log(`Fetched ${invites.size} invites
      ` + invites.forEach((item) => {
			console.log(item.code + ' ' + item.uses);
		}),
		))
		.catch(console.error);

};
module.exports.help = {
	name: 'i_info',
	type: 'admin',
	desc: 'Команда помощи',
};
