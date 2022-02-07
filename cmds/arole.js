module.exports.run = async (bot, message) => {

	let mas = '';
	message.guild.roles.forEach((item) => {
		if (!item.name.search(/NSFW.+/g)) {mas += item.name + ' ' + item.members.size + '\n';}
	});
	message.channel.send(mas);


};
module.exports.help = {
	name: 'frole',
	type: 'admin',
	desc: 'Показать все роли',
};
