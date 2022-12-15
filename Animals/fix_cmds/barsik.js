const Discord = module.require('discord.js');
const show = require('../modules/show.js');

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async (bot, message) => {
	let embed = new Discord.EmbedBuilder();
	embed = await show.run('snow_leopard', getRandomInt(2));
	await message.channel.send({ embeds:[embed] });
};
module.exports.help = {
	name: 'барс',
	type: 'image',
	desc: 'Прислать картинку барса',
};
