module.exports.run = async (bot, message) => {
	const msg = await message.channel.send('Generating avatar...');

	if (!message.guild.iconURL) return msg.edit('No icon!');

	await message.channel.send({ files: [
		{
			attachment: message.guild.iconURL,
			name: 'icon.png',
		},
	] });
	msg.delete();
};
module.exports.help = {
	name: 'icon',
	type: 'admin',
	desc: 'Команда помощи',
};
